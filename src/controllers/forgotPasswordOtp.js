//This controller will manage sending the otp for forgot password.

const getOtp = require('../utils/otpGenerator')
const {dataEncrypter} = require('../utils/dataEncrypter')
const existingUser = require("../utils/existingUser")
const redis = require('../config/redisClient')

const forgotPasswordOtp = (async(req,res)=>{

    const {email} = req.body

    try{
        if(!email){
            res.status(400).json({"Message":"Email not provided"})
        }
        if(! await existingUser(email,false)){
            return res.status(400).json({"Message":"User not found"})
        }
    
        var cache = JSON.parse(await redis.get(`auth:forgot:user:${email}`))
    
        if(cache){
        
            if(cache.attemptsRemaining > 0){
                let otp = await getOtp()
                console.log("attempt otp: ",otp)
                let data = {
                    email:email,
                    otp:await dataEncrypter(otp),
                    attemptsRemaining:cache.attemptsRemaining-1
                }
                await redis.set(`auth:forgot:user:${email}`,JSON.stringify(data),'EX',300)
                return res.status(200).json({"Message":`Otp sent to ${email}`})

            }
            return res.status(429).json({"Message":"Too many attempts, try again in 5 minutes."})

        }
        else{
            let otp = await getOtp()
            console.log("first otp: ",otp)
            let data = {
                email:email,
                otp:await dataEncrypter(otp),
                attemptsRemaining:4
            }
            await redis.set(`auth:forgot:user:${email}`,JSON.stringify(data),'EX',300)
            return res.status(200).json({"Message":`Otp sent to ${email}`})
        }

    }
    catch(err){
        console.log(err)
        return res.status(500).json({"Message":"Some error Occured"})
    }

})

module.exports = forgotPasswordOtp