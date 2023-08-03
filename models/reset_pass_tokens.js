const mongoose = require('mongoose')
const resetTokensSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    accessToken:{
        type:String
    },
    isValid:{
        type:Boolean
    }
},{
    timestamps:true
})
const Reset_tokens=mongoose.model('Reset_Tokens',resetTokensSchema)
module.exports=Reset_tokens