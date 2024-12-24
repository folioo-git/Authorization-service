//This is will tell about if the user is existing in the database or not

const pool = require('../config/db')

async function isExistingUser(email){
    try{
        const [result] = await pool.promise().query(`select count(email) as count from user where email = ?`,[email])
        return result[0].count > 0;
    }
    catch(err){
        console.log("Some error occured in Database.")
        return
    }
}

module.exports = isExistingUser