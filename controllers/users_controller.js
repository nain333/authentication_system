const { session } = require('passport')
const User = require('../models/users')
const Reset_Tokens=require('../models/reset_pass_tokens.js')
const fs = require('fs');
const path = require ('path')
const crypto = require('crypto');
const passwordResetMailer=require('../mailers/reset_password_mailer.js')
const passwordResetWorker=require('../workers/reset_password_worker.js')

module.exports.signIn=(req,res)=>{
    res.render('sign_in',{
        title:'Sign In | Authenticator'
    })
}
module.exports.signUp= (req,res)=>{
    res.render('sign_up',{
        title:'Sign Up | Authenticator'
    })

}
module.exports.createSession=function(req,res){
    console.log('Session is created')
    res.redirect('/users/dashboard/')
}
module.exports.create=async function(req,res){
    try{
    console.log(req.body.email)
    const user = await User.findOne({email:req.body.email})
    console.log(user)
    
    if(user){
        return res.send('user already exists')
    }
    if(req.body.password!=req.body.confirm_password){
        return res.send('Passwords do not match!')
    }
    const newUser=await User.create(req.body)
    console.log('user created successfuly')
    return res.redirect('/')
    
}catch(err){
    console.log(err)
}
}
module.exports.destroySession=function(req,res){
    console.log('inside the destroy session function')
    req.logout(req.user,(err)=>{
        if(err){
        console.log('Error while signing out the user: ',err)
        return
        }
        return res.redirect('/')
    })
    
}
module.exports.forgotPassword=function(req,res){
    res.render('forgot_password',
    {
        title:'Account Recovery || Authenticator'
    })
}
module.exports.resetPassword=async function(req,res){
    try{
    let user= await User.findOne({email:req.body.reset_mail})
    if(user){
    let Token = await Reset_Tokens.create({
        user:user,
    
        accessToken:crypto.randomBytes(100).toString('hex'),
    
        isValid:true
    })
     console.log('your passResetToken is ',Token)
      passwordResetMailer.resetPasswordToken(Token)
    // let job = queue.create('resetemail',Token).save(function(err){
    //     if(err){
    //         console.log('Error in creating qeue for  reset_password_mailer ',err)
    //     }
    //     console.log(job.id)
    // })
    
    console.log('user: ', user)

    }
    return res.render('account_recovery',{
        title:'Account Recovry || Codial',
        resetUser:user,
        resetMail:req.body.reset_mail
        
    })

 }
 catch{
    (err)=>{
        console.log(err)
    }
}
}