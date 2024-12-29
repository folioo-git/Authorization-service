//This manages the refresh token.

const {tokenStatus} = require('../utils/jwtClient')

const validateRefreshToken = (async(req,res)=>{
    const {refreshToken} = req.body

    if(!refreshToken){
        return res.status(400).json({"Message":"Provide Refresh Token"})
    }
    const newToken = tokenStatus(refreshToken)
    if(newToken){
        return res.status(200).json({"token":newToken})
    }
    return res.status(401).json({"Message":"Invalid Token"})


})

module.exports = validateRefreshToken