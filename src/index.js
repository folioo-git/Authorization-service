const app = require("./app")
const {PORT} = require("./config/secrets")

app.listen(PORT,()=>{
    console.log(`Server running on PORT : ${PORT}`)
})