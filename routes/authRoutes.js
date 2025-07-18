const express = require('express')
const { validateSignUp } = require('../middlewares/authMiddleware')
const { HandleSignUp } = require('../controllers/authController')
const Router = express.Router()

Router.post('/signUp', validateSignUp, HandleSignUp)

module.exports = Router