const User = require('../models/users')
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
    console.log(req.body)
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