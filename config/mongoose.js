require('dotenv').config()
const mongoose = require('mongoose')
const dburl=process.env.mongoUrl
// connect mongoose to the database
mongoose.connect(process.env.mongoUrl)
const db = mongoose.connection
db.on('error',console.error.bind(console,`Error while connecting to db`))
db.once('open',()=>{
    console.log(`Successfuly connected :: ${dburl}`)

})
module.exports=db