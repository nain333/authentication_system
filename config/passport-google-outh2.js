const passport = require('passport')
const googleOth= require('passport-google-oauth').OAuth2Strategy
const crypto = require('crypto')
const User = require('../models/users')
passport.use(new googleOth({
    clientID:'1073256670957-34v8v7427e0jaaattcoms5ret0l85lj5.apps.googleusercontent.com',
    clientSecret:'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',
    callbackURL:'http://localhost:7000/users/auth/google/callback',
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