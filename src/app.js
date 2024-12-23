const express = require('express')
const app = express()
const basicAuthRoutes = require("./routes/basicAuthRoutes")
const jsonBodyValidator = require("./middlewares/jsonBodyValidator")

//MIDDLWARES

app.use(express.json())         //Allowing for JSON body to parsed
app.use(jsonBodyValidator)

//ROUTES

app.use("/auth",basicAuthRoutes)

//Test Route
app.get("/test",((req,res)=>{
    res.status(200).json({"Message":"msg"})
}))

module.exports = app