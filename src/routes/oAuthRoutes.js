//This contains the routes and logic for oAuth

const express = require('express')
const router = express.Router()
const {passportGithub,githubCallback} = require('../utils/oAuthGithub')
const {passportGoogle,googleCallback} = require('../utils/oAuthGoogle')
const {CLIENT_URL} = require("../config/secrets")


router.get("/github",passportGithub.authenticate('github',{scope:['user:email']}))
router.get("/github/callback",passportGithub.authenticate('github',{session:false,failureRedirect:`${CLIENT_URL}/login`}),githubCallback)

router.get("/google",passportGoogle.authenticate('google',{
    scope:['email','profile']
}))
router.get("/google/callback",passportGoogle.authenticate('google',{session:false,failureRedirect:`${CLIENT_URL}/login`}),googleCallback)

module.exports = router