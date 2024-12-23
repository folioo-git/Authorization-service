const express = require('express')
const router = express.Router()

const userSignUp = require('../controllers/userSignUp')


router.post("/api/signup",userSignUp)



module.exports = router