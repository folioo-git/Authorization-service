//This controller manages the logic for updating password by confirming the otp.

const {checker,dataEncrypter} = require('../utils/dataEncrypter')
const redis = require('../config/redisClient')
const pool = require('../config/db')

const updatePassword = (async(req,res)=>{

    try{

        const {email,otp,password} = req.body
        if(!email || !otp || !password){
            return res.status(400).json({"Message":"All Paramaters not provided"})
        }
        var cache = JSON.parse(await redis.get(`auth:forgot:user:${email}`))
    
        if(cache){
            if(cache.attemptsRemaining > 0){
                if(await checker(cache.otp,otp.toString())){
                    await redis.del(`auth:forgot:user:${email}`)
                    await pool.promise().query("update user set password = ? where email = ?",[await dataEncrypter(password),email])

                    return res.status(200).json({"Message":"Updated Password"})
                }
                else{
                    let data ={
                        email: cache.email,
                        otp:cache.otp,
                        attemptsRemaining:cache.attemptsRemaining-1
                    }
                    await redis.set(`auth:forgot:user:${email}`,JSON.stringify(data),'EX',300)
                    return res.status(401).json({"Message":"Wrong Otp"})
                }
            }
            return res.status(429).json({"Message":"Too many attempts, try again in 5 minutes."})

        }
        else{
            return res.status(400).json({"Message":"Invalid request"})
        }
    }
    catch(err){
        console.log(err)
        return res.status(500).json({"Message":"Some Error Occured"})
    }
})

module.exports = updatePassword