//This is to get the redis connection.

const Redis = require('ioredis')
const { REDIS_PORT, REDIS_HOST, REDIS_USER, REDIS_PASSWORD } = require('./secrets')

const redis = new Redis({
    port:REDIS_PORT,
    host:REDIS_HOST,
    username:REDIS_USER,
    password:REDIS_PASSWORD,
    db:0
})

redis.on("connect",()=>{
    console.log("Successfully Connected to Redis")
})

redis.on("error",(err)=>{
    console.log("Error connecting to Redis")
    console.log(err)
})

module.exports = redis