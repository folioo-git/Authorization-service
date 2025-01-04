//This contains the routes and logic for oAuth

const express = require('express')
const router = express.Router()
const {passportGithub,githubCallback} = require('../utils/oAuthGithub')


router.get("/github",passportGithub.authenticate('github',{scope:['user:email']}))
router.get("/github/callback",passportGithub.authenticate('github',{session:false}),githubCallback)

module.exports = router