const express = require('express')
const { validateSignUp } = require('../middlewares/authMiddleware')
const { HandleSignUp, HandleLogin, HandleFindAllUsers, HandleDeleteUser } = require('../controllers/authController')
const Router = express.Router()

Router.post('/signUp', validateSignUp, HandleSignUp)
Router.post('/login', HandleLogin)
Router.get('/get-all-users', HandleFindAllUsers)
Router.delete('/delete-user/:id', HandleDeleteUser)

module.exports = Router