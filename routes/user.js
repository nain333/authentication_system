const express = require('express')
const passport=require('passport')
const usersController=require('../controllers/users_controller')
const router = express.Router()
router.get('/sign-in',usersController.signIn)
router.get('/sign-up',usersController.signUp)
router.use('/dashboard',require('./dashboard'))
router.get('/destroy-session',usersController.destroySession)
router.get('/auth/google',passport.authenticate('google',{
    scope:['profile','email']
}))
router.get('/auth/google/callback',passport.authenticate('google',{
    failureRedirect:'/users/sign-in'
}),usersController.createSession)
router.post('/create',usersController.create)
router.post('/create-session',(req,res,next)=>{
    console.log('req.body inside the createSession route: ',req.body)
    next()

},passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in-failed'}
),usersController.createSession)
router.post('/account-recovery',usersController.resetPassword)
router.get('/forgot-password',usersController.forgotPassword)
module.exports = router;