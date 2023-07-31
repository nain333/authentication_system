const express = require('express')
const app = express();
const path = require('path')
const port = 7000
const db = require('./config/mongoose')
const cookieParser=require('cookie-parser')
const expressLayouts=require('express-ejs-layouts')
const passport = require('passport')
const passportLocal=require('./config/passport-local-streategy')
const expressSession=require('express-session')
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))
app.use(express.static('./assets'))

app.use(expressLayouts)
app.set('layout extractStyles',true)
app.set('layout extractScripts',true)
app.use(cookieParser())


app.use(express.urlencoded({extended:true}))
app.use(expressSession(
    {
        name:'Authenticator',
        secret:'create a session buddy',
        saveUninitialized:false,
        resave:false,
        cookie:{
            maxAge:600000
            
        }
    }
))
app.use(passport.initialize())
app.use(passport.session())
app.use(passport.setAuthenticatedUser)
app.use('/',require('./routes'))


app.listen(port,(err)=>{
    if(err){
        console.log('Error in running the server',err)
    }
    console.log(`server is ua and running on port: ${port}`)
})