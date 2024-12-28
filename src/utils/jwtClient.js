//This manages all the operations for JWT.

const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config/secrets')

function getToken(email){
    const token =  jwt.sign({email:email},JWT_SECRET,{algorithm:'HS256',expiresIn:'30m'})
    return token
}

function getRefreshToken(email){
    const token =  jwt.sign({email:email},JWT_SECRET,{algorithm:'HS256',expiresIn:'7d'})
    return token
}

module.exports = {getRefreshToken,getToken}
