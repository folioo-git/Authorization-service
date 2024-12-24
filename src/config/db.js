// This file will create a connection with mysql database.

const mysql = require('mysql2')

const {DB_HOST,DB_USER,DB_PASSWORD,DB_NAME,DB_POOL_LIMIT} = require('../config/secrets')

const pool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    connectionLimit: DB_POOL_LIMIT
})

pool.getConnection((err,connection)=>{
    if(err){
        console.log("Error connecting the database.")
        console.log(err)
    }
    else{
        console.log("Database connected Successfully.")
        connection.release()
    }
})

module.exports = pool
