//This will help to encrypt the data.

const bcrypt = require('bcrypt')
const {SALT_ROUND} = require('../config/secrets')

async function dataEncrypter(data){
    try{
        const hashData = await bcrypt.hash(data.toString(),parseInt(SALT_ROUND))
        return hashData
    }
    catch(err){
        console.log("Error While Encrypting")
        console.log(err)
    }

}

async function checker(hashedData,data) {
    try{
        var result = await bcrypt.compare(data,hashedData)
        return result
    }
    catch(err){
        console.log("Some error occured in Hashed Checking")
        console.log(err)
        return res.status(500).json({"Message":"Some error Occured"})
    }
}

module.exports = {dataEncrypter,checker}