//This is a utility that will help to generate otp for email validation purpose


async function getOtp() {
    var otp = (Math.floor(1000 + Math.random() * 9000)).toString()
    return otp.toString()
}

module.exports = getOtp
