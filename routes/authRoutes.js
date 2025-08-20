const express = require('express')
const { validateSignUp, Authorization, isAdmin } = require('../middlewares/authMiddleware')
const { HandleSignUp, HandleLogin, HandleFindAllUsers, HandleDeleteUser, updateUsersRole, findUserInfo, updateUserProfile } = require('../controllers/authController')
const Router = express.Router()

Router.post('/signUp', validateSignUp, HandleSignUp)
Router.post('/login', HandleLogin)
Router.get('/get-all-users', Authorization, isAdmin, HandleFindAllUsers)
Router.delete('/delete-user/:id', Authorization, isAdmin, HandleDeleteUser)
Router.put('/update-user-role/:id', Authorization, isAdmin, updateUsersRole)
Router.get('/find-user-info/:id', Authorization, findUserInfo)
Router.put('/update-user-profile/:id', Authorization, updateUserProfile)

module.exports = Router