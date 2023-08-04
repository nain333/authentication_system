const passport= require('passport')
const LocalStreategy=require('passport-local');
const bcrypt=require('bcryptjs')
const User = require('../models/users');
passport.use(new LocalStreategy({
    usernameField: 'email',
    passReqToCallback:true
    
    },
    async function (req,email,password,done){
        // find the user and establish the identity
try{
    console.log('inside authenticator')
        const user = await User.findOne({
            email:email
        })
        console.log('user inside passportjs: ',user)
        const isValid=await bcrypt.compare(password,user.password)
        if(!user || !isValid){ 
           req.flash('success','Incorrect username/password')
         
          return done(null,false)
        }
        console.log('user retured to the authenticator')
        return done(null,user)
        

}catch(err){
   req.flash('success','invalid username/password')
  
    console.log(`Error while finding user --->>> ${err}`)

}

    }
    ))
    

passport.serializeUser(function(user, done) {
    done(null, user);
  });

    passport.deserializeUser(function(user, done) {
        done(null, user);
      });

    // check if the user is authanticated
    passport.checkAuthentication = (req, res, next) => {
        // If the user is signed in, then pass the request to the next middleware or controller's function
        if (req.isAuthenticated()) {
          return next();
        } else {
          return res.redirect('/users/sign-in');
        }
      };
      
        

    passport.setAuthenticatedUser=function(req,res,next){
        if(req.isAuthenticated()){
            // req.user contains the currrent signed in user from the session cookie , just sending it to the locals for the views
            console.log("User inside setAuthenticated User: ",req.user)
            res.locals.user = req.user
            console.log("set authenticated user ")
    
        }
        next();


    }
    module.exports= passport;