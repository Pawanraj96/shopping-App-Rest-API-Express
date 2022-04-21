const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.js')
//register
router.post('/register', userController.userRegistration)
//login
router.post('/login',userController.userLogin)




module.exports = router