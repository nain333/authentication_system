const express = require('express')
const passport = require('passport')
const dashboardController=require('../controllers/dashboard_controller')
const router = express.Router()
router.get('/:id',passport.checkAuthentication,dashboardController.dashboard)
module.exports=router