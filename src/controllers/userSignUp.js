// This controller all the User sign up related logic for basic Authentication.

const dataEncrypter = require("../utils/dataEncrypter")
const isExistingUser = require('../utils/existingUser')
const getOtp = require('../utils/otpGenerator')
const redis = require('../config/redisClient')

const userSignUp = (async(req,res)=>{

    try{
        const {email,password} = req.body;
    
        if(req.body){
            if(email){
                
                if(password){

                    //Both email and Password are present

                    const existing = await isExistingUser(email)
                    if(existing === undefined){
                        throw Error
                    }

                    
                    var hashedPassword = await dataEncrypter(password)
                    
                    if(!existing){

                        var otp = await getOtp()

                        var data = {
                            email:email,
                            password:hashedPassword,
                            otp:otp,
                            attemptsRemaining:3
                        }
                        await redis.set(`auth:user:${email}`,JSON.stringify(data),'EX',300)
                        return res.status(201).json({"Message":`OTP has been sent to email ${email}`})

                    }
                    else{
                        const existingUserCache = JSON.parse(await redis.get(`auth:user:${email}`))
                
                        if(existingUserCache){
                            if(existingUserCache.attemptsRemaining > 0){

                                var otp = await getOtp()

                                var data = {
                                    email:email,
                                    password:hashedPassword,
                                    otp:otp,
                                    attemptsRemaining:existingUserCache.attemptsRemaining-1
                                }
                                await redis.set(`auth:user:${email}`,JSON.stringify(data),'EX',300)
                    
                                return res.status(201).json({"Message":`OTP has been sent to email ${email}`})
                            }
                            else{
                                return res.status(429).json({"Message":"Too many request. Try again after 5 minutes."})
                            }
                        } 
                        return res.status(409).json({"Message":"Email Already Exists."})

                    }

                    
                }
                else{

                    return res.status(400).json({"Message":"No Password provided in body"});
                }
            }
            else{
                return res.status(400).json({"Message":"No Email provided in body"});
            }
        }
        else{
            return res.status(400).json({"Message":"No body provided"});
        }
    }
    catch(err){
        console.log(err)
        return res.status(500).json({"Message":"Some Error Occured in Server"})
    }

})

module.exports = userSignUp