const express = require('express')
const Router = express.Router()
const itemRoutes = require('./itemRoutes')
const authRoutes = require('./authRoutes')


const routes = [
    itemRoutes,
    authRoutes
]

module.exports = routes