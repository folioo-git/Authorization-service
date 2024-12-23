const express = require('express')
const app = express()

app.use(express.json())         //Allowing for JSON body to parsed


//Test Route
app.get("/test",((req,res)=>{
    res.statusCode(404).body({"Message":"msg"}).send()
}))

module.exports = app