const express = require('express')
const passport=require('passport')
const usersController=require('../controllers/users_controller')
const router = express.Router()
router.get('/sign-in',usersController.signIn)
router.get('/sign-up',usersController.signUp)
router.use('/dashboard',require('./dashboard'))
router.post('/create',usersController.create)
router.post('/create-session',(req,res,next)=>{
    console.log('req.body inside the createSession route: ',req.body)
    next()

},passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in-failed'}
),usersController.createSession)
module.exports = router;