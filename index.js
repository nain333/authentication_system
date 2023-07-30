const express = require('express')
const app = express();
const path = require('path')
const port = 7000
const db = require('./config/mongoose')

const expressLayouts=require('express-ejs-layouts')
app.set('view engine','ejs')

app.set('views',path.join(__dirname,'views'))
app.use(express.static('./assets'))
app.use(expressLayouts)
app.set('layout extractStyles',true)
app.set('layout extractScripts',true)

app.use('/',require('./routes'))


app.listen(port,(err)=>{
    if(err){
        console.log('Error in running the server',err)
    }
    console.log(`server is ua and running on port: ${port}`)
})