//This manages the rabbit mq connection.

const amqplib = require('amqplib')
const {RABBIT_MQ_HOST,RABBIT_MQ_PORT,RABBIT_MQ_USER,RABBIT_MQ_PASSWORD} = require("../config/secrets")


async function getQueueChannel(){
    try{
        
        const connection = await amqplib.connect(`amqp://${RABBIT_MQ_USER}:${RABBIT_MQ_PASSWORD}@${RABBIT_MQ_HOST}:${RABBIT_MQ_PORT}`)
        
        const channel = await connection.createChannel()
        console.log("Rabbit Mq connected")
        return channel
    }
    catch(err){
        console.log(err)
    }
} 



module.exports = getQueueChannel