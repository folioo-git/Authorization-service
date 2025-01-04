const express = require('express')
const app = express()
const {initExchanges_Queues,publishToNotification,publishToUser} = require('./utils/rabbitManager')
const basicAuthRoutes = require("./routes/basicAuthRoutes")
const jsonBodyValidator = require("./middlewares/jsonBodyValidator")
const redis = require('./config/redisClient')
const oAuthRoutes = require("./routes/oAuthRoutes")

//MIDDLWARES

app.use(express.json())         //Allowing for JSON body to parsed
app.use(jsonBodyValidator)      //To catch any error in sent json body
redis.set("greetings","Hello")
redis.expire("greetings",30)
initExchanges_Queues()


//ROUTES

app.use("/auth",basicAuthRoutes)
app.use("/oauth",oAuthRoutes)

//Test Route
app.get("/test",((req,res)=>{
    res.status(200).json({"Message":"Yes service is up and working."})
}))

module.exports = app