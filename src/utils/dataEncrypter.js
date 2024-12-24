//This will help to encrypt the data.

const bcrypt = require('bcrypt')
const {SALT_ROUND} = require('../config/secrets')

async function dataEncrypter(data){
    try{
        const hashData = await bcrypt.hash(data,parseInt(SALT_ROUND))
        return hashData
    }
    catch(err){
        console.log("Error While Encrypting")
    }

}

module.exports = dataEncrypter