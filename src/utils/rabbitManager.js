//This maanges making all exchanges and queues and their publisher

const getQueueChannel = require('../config/rabbitMqClient')

const userExchange = 'userExchange'
const notificationExchange = 'notificationExchange'

var channel = null;
async function initExchanges_Queues() {
        try{

            //Declaring Exchanges 
            channel = await getQueueChannel()
            await channel.assertExchange(userExchange,'fanout',{durable:true})
            await channel.assertExchange(notificationExchange,'fanout',{durable:true})

            //Declaring Queues

            const user_portfolio = await channel.assertQueue('user_portfolio',{durable:true})
            const notification_otp = await channel.assertQueue('notification_otp',{durable:true})
            
            //Binding Queues

            await channel.bindQueue(user_portfolio.queue,userExchange,'')
            await channel.bindQueue(notification_otp.queue,notificationExchange,'')

            console.log("Successfully initialized exchanges and queues.")

        }
        catch(err){
            console.log('Error in rabbit mq')
            console.log(err)
        }
    
}

async function publishToNotification(data){
    try{
        if(channel == null){
            console.log("Channel not initilized")
            throw Error
        }
        await channel.publish(notificationExchange,'',Buffer.from(JSON.stringify(data)))
        return true
    }
    catch(err){
        console.log("Error")
        console.log(err)
        return false
    }
}

async function publishToUser(data){
    try{
        if(channel == null){
            console.log("Channel not initilized")
            throw Error
        }

        await channel.publish(userExchange,'',Buffer.from(JSON.stringify(data)))
        return true
    }
    catch(err){
        console.log("Error")
        console.log(err)
        return false
    }
}


module.exports = {initExchanges_Queues,publishToNotification,publishToUser}