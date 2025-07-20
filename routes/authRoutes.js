const express = require('express')
const { validateSignUp } = require('../middlewares/authMiddleware')
const { HandleSignUp, HandleLogin } = require('../controllers/authController')
const Router = express.Router()

Router.post('/signUp', validateSignUp, HandleSignUp)
Router.post('/login', HandleLogin)

module.exports = Router