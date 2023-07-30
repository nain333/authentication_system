const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        requried:true,
        unique:true

    },
    password:{
        type:String,
        required:true
    }
    
})
const User= mongoose.model('User',userSchema)
module.exports=User