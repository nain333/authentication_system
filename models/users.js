const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
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
    
},{
    timestamps:true
})
// pre model function to be called before saving password new / modified by user 
userSchema.pre('save',async function(next){
    console.log('pre insdie user Model is called')

    if(this.isModified('password')||this.isNew){

        const hash = await bcrypt.hash(this.password,13)
        console.log("hashed password is: ", hash)
        this.password=hash

    }
    next()

})

// userSchema.pre('',async function(next){
//     console.log('pre updation insdie user Model is called')

//     if(this.isModified('password')||this.isNew){

//         const hash = await bcrypt.hash(this.password,13)
//         console.log("hashed password is: ", hash)
//         this.password=hash

//     }
//     next()

// })
const User= mongoose.model('User',userSchema)
module.exports=User