const express = require('express')
const homeController=require('../controllers/home_controller.js')
const router = express.Router()
router.get('/',homeController.home)
router.use('/users',require('./user'))
module.exports = router