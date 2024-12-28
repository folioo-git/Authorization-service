const express = require('express')
const router = express.Router()

const userSignUp = require('../controllers/userSignUp')
const validateOTP = require('../controllers/validateOTP')

router.post("/api/signup",userSignUp)
router.post("/api/validateOtp",validateOTP)



module.exports = router