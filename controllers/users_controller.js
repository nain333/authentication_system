const passport = require('passport')
const User = require('../models/users')
const Reset_Tokens=require('../models/reset_pass_tokens.js')
const crypto = require('crypto');
const passwordResetMailer=require('../mailers/reset_password_mailer.js')
// // const passwordResetWorker=require('../workers/reset_password_worker.js')
// const queue=require('../config/kue')
// render sign In page
module.exports.signIn=(req,res)=>{
    res.render('sign_in',{
        title:'Sign In | Authenticator'
    })
}
// render sign up page
module.exports.signUp= (req,res)=>{
    res.render('sign_up',{
        title:'Sign Up | Authenticator'
    })

}
// create userSession
module.exports.createSession=function(req,res){
    console.log('Session is created')
    req.flash('success','Signed in successfuly!')
    res.redirect('/users/dashboard/')
}
// create new user in the db and save the password in hashed format via pre-modle function call
module.exports.create=async function(req,res){
    try{
    console.log(req.body.email)
    const user = await User.findOne({email:req.body.email})
    console.log(user)
    
    if(user){
        // return res.send('user already exists')
         req.flash('success','User already exists')
        return res.redirect('/users/sign-up')
    }
    if(req.body.password!=req.body.confirm_password){
        return res.send('Passwords do not match!')
    }
    const newUser=await User.create(req.body)
    console.log('user created successfuly')
    req.flash('success', 'sucessfuly singed up as ',newUser.name)
    return res.redirect('/')
    
}catch(err){
    console.log(err)
}
}
// log the user out
module.exports.destroySession=function(req,res){
    console.log('inside the destroy session function')
    req.logout(req.user,(err)=>{
        if(err){
        console.log('Error while signing out the user: ',err)
        return
        }
        req.flash('success','Logged out successfuly')
        return res.redirect('/')
    })
    
}
// render forget password page
module.exports.forgotPassword=function(req,res){
    res.render('forgot_password',
    {
        title:'Account Recovery || Authenticator'
    })
}
// send password recovery mail if the recovery email is valid
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

// ask a new password when the link with token is clicked inside the mail sent

module.exports.askNewPassword=async function(req,res){
    // try{
    // var resetToken =  await Reset_Tokens.findOne({accessToken:req.params.accessToken})
    // console.log('findOne result: ',resetToken)
    // console.log('token in url:',req.params.accessToken.toString())
    // console.log('token inside ask password: ',token)
    // return res.render('create_new_password',{
    //     token:resetToken,
    //     title:'Create new Password'
        
    // })
    // }
    // catch{
    //     console.log('Error in finding User')
    // }

    
    Reset_Tokens.findOne({
        accessToken:req.params.accessToken.toString()
        
    }).then((token)=>{
        console.log('token inside url :',req.params.accessToken)
        console.log('Token inside the findOne: ',token)
        return res.render('create_new_password',{
            title:'Create a new password | Authenticator',
            token:token

        })


    })
    

}
// set the new passwprd if matches confirm password and save it to db in hashed format
module.exports.setNewPassword=async function(req, res){
    try{
    let token = await Reset_Tokens.findOne({accessToken:req.params.accessToken})
    console.log('Token inside setNewPassword:',token)
    if(token.isValid){
        if(req.body.new_password!=req.body.confirm_new_password){
            return res.send('<h1>Password and confirm Passwords dont match, please try again<h1>')
        }
        else{
            console.log('user_id of updation: ',token.user._id," confirm passsword ",req.body.confirm_new_password)
            let findPassword=await User.findOne({
                _id:token.user._id


            })
            findPassword.password=req.body.confirm_new_password;
            await findPassword.save()
            
            console.log('Password set successfully')
            let setFalse=await Reset_Tokens.findOneAndUpdate({accessToken:req.params.accessToken},{isValid:false}) 
            }
            // return res.redirect('/users/reset-password/successfully')
            // return res.send(
            //     '<h1> password set successfully</h1> <a href="/users/sign-in">return to login</a>'
                
            //     )
            req.flash('success','password Reset Successfuly')
            res.redirect('back')
        }else{
            // res.send('Your access token expired plese request for password change again!')
            req.flash('error','your Token has expired')
            res.redirect('back')
        }
    }catch(err){
        console.log('Error while update the password', err)
    }

}