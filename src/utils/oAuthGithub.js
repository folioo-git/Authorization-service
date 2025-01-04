//This manages the oAuth related to Github.
const {getToken,getRefreshToken} = require('./jwtClient')
const isExistingUser = require('./existingUser')
const passportGithub = require('passport')
const GitHubStrategy = require('passport-github2').Strategy
const {GITHUB_CLIENT_ID,GITHUB_SECRET,GITHUB_CALLBACKURL,CLIENT_URL} = require("../config/secrets")
const pool = require('../config/db')

passportGithub.use(new GitHubStrategy(
    {
        clientID : GITHUB_CLIENT_ID,
        clientSecret : GITHUB_SECRET,
        callbackURL : GITHUB_CALLBACKURL,
        scope : ['user:email']
    },
    async(accessToken, refreshToken, profile, done)=>{
        var email = profile.emails[0].value
        
        try{
            if(! await isExistingUser(email,false)){
                await pool.promise().query('insert into user (email,auth_provider) values(?,?)',[email,'github'])
            }
            const resp = {token:getToken(email),refreshToken:getRefreshToken(email)}
            return done(null,resp)
        }
        catch(err){
            return done(err)
        }
    }
))

const githubCallback = (req,res)=>{
    // console.log(req.user)
    res.redirect(`${CLIENT_URL}/?jwt=${req.user}`)
}

module.exports = {passportGithub,githubCallback}

