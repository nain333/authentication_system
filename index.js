require('dotenv').config()
console.log('mongoUrl in process.env: ',process.env.mongoUrl)
const express = require('express')
const app = express();
// const redisConnection=require('./config/redis')
// I excluded workers and qeues from the project because I don't have aws instance and I tried connecting to redis on render.com , but couldn't connect ried redis and ioredis for the connection, for the sake of deployment purposes I am dropping qeues and workers from my project
const path = require('path')
const port = 7000
const db = require('./config/mongoose')

const cookieParser=require('cookie-parser')
const expressLayouts=require('express-ejs-layouts')
const passport = require('passport')
const passportLocal=require('./config/passport-local-streategy')
const expressSession=require('express-session')
const MongoStore=require('connect-mongo')
const passportGoogle=require('./config/passport-google-outh2')
const flash = require('connect-flash')
const customMware=require('./config/middleware.js')

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
        secret:process.env.sessionSecret,
        saveUninitialized:false,
        resave:false,
        cookie:{
            maxAge:600000
            
        },
        store:MongoStore.create(
            {
                mongoUrl:process.env.mongoUrl
            }
        )
    }
))
app.use(passport.initialize())
app.use(passport.session())
app.use(passport.setAuthenticatedUser)
app.use(flash())
app.use(customMware.setFlash)
app.use('/',require('./routes'))


app.listen(port,(err)=>{
    if(err){
        console.log('Error in running the server',err)
    }
    console.log(`server is ua and running on port: ${port}`)
})