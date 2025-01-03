// This controller will check the cache for OTP and validate the user if correct OTP then input details into Database and
// then return JWT 

const pool = require('../config/db')
const redis = require('../config/redisClient')
const {checker} = require("../utils/dataEncrypter")
const {getToken,getRefreshToken} = require('../utils/jwtClient')
const {publishToUser} = require("../utils/rabbitManager")

const validateOTP = (async (req,res)=>{

    try{
        const {email,otp} = req.body

        if(!email || !otp){
            return res.status(400).json({"Message":"Invalid Body"})
        }
        const cache = JSON.parse(await redis.get(`auth:user:${email}`))
        if(cache){

            if(cache.attemptsRemaining > 0){

                if(await checker(cache.otp , otp.toString())){
                    
                    await pool.promise().query("insert into user (email,password) values (?,?)",[cache.email,cache.password])

                    await publishToUser({email:email,newUser:true})

                    await redis.del(`auth:user:${email}`)

                    return res.status(201).json({"Message":"Created User","token":getToken(cache.email),"refreshToken":getRefreshToken(cache.email)})

                
                }
                else{
                    var data = {
                        email:cache.email,
                        password:cache.password,
                        otp:cache.otp,
                        attemptsRemaining:cache.attemptsRemaining-1
                    }
                    await redis.set(`auth:user:${email}`,JSON.stringify(data),'EX',300)

                    return res.status(400).json({"Message":"Wrong OTP"})
                }
            }
            else{
                return res.status(429).json({"Message":"Too many request, try again in 5 minutes."})
            }
        }
        else{
            return res.status(400).json({"Message":"Invalid Request"})
        }
    }
    catch(err){
        console.log(err)
        return res.status(500).json({"Message":"Some Error occured, try again after some time."})
    }
})

module.exports = validateOTP