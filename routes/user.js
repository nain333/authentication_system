const express = require('express')
const usersController=require('../controllers/users_controller')
const router = express.Router()
router.get('/sign-in',usersController.signIn)
router.get('/sign-up',usersController.signUp)
router.use('/dashboard',require('./dashboard'))
router.post('/create',usersController.create)
module.exports = router;