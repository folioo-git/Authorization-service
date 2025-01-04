//This manages the Google Strategies for oAuth.

const passportGoogle = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const {GOOGLE_CLIENT_ID,GOOGLE_SECRET,GOOGLE_CALLBACKURL,CLIENT_URL} = require('../config/secrets')
const pool = require('../config/db')
const isExistingUser = require('./existingUser')
const {getToken,getRefreshToken} = require('./jwtClient')
const {publishToUser} = require('../utils/rabbitManager')

passportGoogle.use(new GoogleStrategy({
    clientID : GOOGLE_CLIENT_ID,
    clientSecret : GOOGLE_SECRET,
    callbackURL : GOOGLE_CALLBACKURL,
},
    async function(accessToken,refreshToken,profile,done) {
        var email = profile.emails[0].value
        try{
            if(! await isExistingUser(email,false)){
                await pool.promise().query('insert into user (email,auth_provider) values(?,?)',[email,'google'])
                await publishToUser({email:email,newUser:true})
            }
            const resp = {token:getToken(email),refreshToken:getRefreshToken(email)}
            return done(null,resp)
        }
        catch(err)
        {
            return done(err)
        }
    }
))

const googleCallback = (req,res)=>{
    console.log(req.user)
    res.redirect(`${CLIENT_URL}/?jwt=${req.user}`)
}

module.exports = {passportGoogle,googleCallback}