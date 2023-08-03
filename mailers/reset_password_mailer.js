const nodeMailer= require('../config/nodemailer')
exports.resetPasswordToken=(token)=>{

    console.log('Token inside resetPassword Mailer', token)
    let htmlString=nodeMailer.renderTamplet({         token:token
    },'reset_password/reset_password.ejs')
    
    console.log('tamplet randered successfully')
    
    nodeMailer.transporter.sendMail({
        from:'admin@codial.com',
        to: token.user.email,
        subject:"Password Reset Requested!",
        html:htmlString
    },(err,info)=>{
        if(err){
            console.log('error in sending mail: ',err)
            return
        }
        console.log('Mail sent successfully ',info)
        return

    })
    console.log('nodeMailer is working')

}