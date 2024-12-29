//This controller file manages all the logic related to user Login.

const pool = require('../config/db')
const {checker} = require('../utils/dataEncrypter')
const isExistingUser = require('../utils/existingUser')
const redis = require('../config/redisClient')
const {getToken,getRefreshToken} = require('../utils/jwtClient')

const userLogin = (async (req,res)=>{

    try{
        const {email,password} = req.body

        if(!email || !password){
            return res.status(400).json({"Message":"Email or Password not provided"})
        }

        if(! await isExistingUser(email,false)){
            return res.status(404).json({"Message":"Email not found"})
        }

        var cache = JSON.parse(await redis.get(`auth:login:user:${email}`))

        if(cache){
            if(cache.attemptsRemaining > 0){
                const data = {
                    email:email,
                    attemptsRemaining:cache.attemptsRemaining-1
                }
                await redis.set(`auth:login:user:${email}`,JSON.stringify(data),'EX',300)
            }
            else{
                return res.status(429).json({"Message":"Too many requests, try again in 5 minuts."})
            }

        }
        else{
            var data = {
                email: email,
                attemptsRemaining:4
            }
            await redis.set(`auth:login:user:${email}`,JSON.stringify(data),'EX',300)
        }

        const [result] = await pool.promise().query('select password from user where email = ?',[email])

        if(await checker(result[0].password,password)){
            await redis.del(`auth:login:user:${email}`)
            return res.status(200).json({"Message":"Verified","token":getToken(email),"refreshToken":getRefreshToken(email)})
        }
        return res.status(401).json({"Message":"Wrong Password"})
        
        

        
    }
    catch(err){
        console.log(err)
    }

})

module.exports = userLogin