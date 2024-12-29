const express = require('express')
const router = express.Router()

const userSignUp = require('../controllers/userSignUp')
const validateOTP = require('../controllers/validateOTP')
const userLogin = require("../controllers/userLogin")
const forgotPasswordOtp = require('../controllers/forgotPasswordOtp')
const updatePassword = require('../controllers/updatePassword')
const validateRefreshToken = require('../controllers/refreshToken')

router.post("/api/signup",userSignUp)
router.post("/api/validateOtp",validateOTP)
router.post("/api/login",userLogin)
router.route("/api/forgotPassword").post(forgotPasswordOtp).put(updatePassword)
router.post("/api/refreshToken",validateRefreshToken)



module.exports = router