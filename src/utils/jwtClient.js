//This manages all the operations for JWT.

const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config/secrets')

function getToken(email){
    const token =  jwt.sign({email:email},JWT_SECRET,{algorithm:'HS256',expiresIn:'30m'})
    return token
}

function getRefreshToken(email){
    const token =  jwt.sign({email:email,type:"refresh"},JWT_SECRET,{algorithm:'HS256',expiresIn:'10s'})
    return token
}

function tokenStatus(token){
    try{
        const decodedToken = jwt.verify(token,JWT_SECRET)
        if(decodedToken.type === 'refresh'){
            return getToken(decodedToken.email)
        }

    }
    catch(err){
        return null
        
    }
}

module.exports = {getRefreshToken,getToken,tokenStatus}
