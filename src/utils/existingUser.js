//This is will tell about if the user is existing in the database and cache or not

const pool = require('../config/db')
const redis = require('../config/redisClient')

async function isExistingUser(email){
    try{
        
        var cache = JSON.parse(await redis.get(`auth:user:${email}`))
        if(cache){
            return 1
        }
        const [result] = await pool.promise().query(`select count(email) as count from user where email = ?`,[email])
        return result[0].count > 0;


    }
    catch(err){
        console.log("Some error occured in Database.")
        return
    }
}

module.exports = isExistingUser