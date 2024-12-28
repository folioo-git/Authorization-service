//This is a utility that will help to generate otp for email validation purpose

const dataEncrypter = require("./dataEncrypter")

async function getOtp() {
    var otp = (Math.floor(1000 + Math.random() * 9000)).toString()
    return await dataEncrypter(otp)
}

module.exports = getOtp
