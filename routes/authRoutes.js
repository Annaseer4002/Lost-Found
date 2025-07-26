const express = require('express')
const { validateSignUp, Authorization, isAdmin } = require('../middlewares/authMiddleware')
const { HandleSignUp, HandleLogin, HandleFindAllUsers, HandleDeleteUser } = require('../controllers/authController')
const Router = express.Router()

Router.post('/signUp', validateSignUp, HandleSignUp)
Router.post('/login', HandleLogin)
Router.get('/get-all-users', Authorization, isAdmin, HandleFindAllUsers)
Router.delete('/delete-user/:id', Authorization, isAdmin, HandleDeleteUser)

module.exports = Router