const express = require('express')
const dashboardController=require('../controllers/dashboard_controller')
const router = express.Router()
router.get('/',dashboardController.dashboard)
module.exports=router