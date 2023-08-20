const passport = require('passport')
const googleOth= require('passport-google-oauth').OAuth2Strategy
const crypto = require('crypto')
const User = require('../models/users')
passport.use(new googleOth({
    clientID:process.env.clientID,
    clientSecret:process.env.clientSecret,
    callbackURL:process.env.callbackURL,
},
    async function(accessToken,refreshToken,profile,done){
        try{
            let user = await User.findOne({email: profile.emails[0].value});
    
            if(user){
                // console.log('user already exists :',user)
                return done(null, user);

            }else{
                user = await User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                });
                // console.log('user created: ',user)
                return done(null, user);

            }
        }catch(error){
            console.log("Error in passport google strategy file",error);
        }
        
    }

)
)
module.exports=passport