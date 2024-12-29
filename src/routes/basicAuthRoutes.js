const express = require('express')
const router = express.Router()

const userSignUp = require('../controllers/userSignUp')
const validateOTP = require('../controllers/validateOTP')
const userLogin = require("../controllers/userLogin")

router.post("/api/signup",userSignUp)
router.post("/api/validateOtp",validateOTP)
router.post("/api/login",userLogin)



module.exports = router