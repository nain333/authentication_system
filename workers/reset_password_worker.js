const queue = require('../config/kue.js')
const reset_pass_mailer=require('../mailers/reset_password_mailer')
queue.process('resetemail',function(job, done){
    console.log('reset_password_mailer is processing a job' ,job.data)
    reset_pass_mailer.resetPasswordToken(job.data)
    done()
})