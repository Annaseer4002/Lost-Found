const express = require('express')
const Router = express.Router()
const foundItemRoutes = require('./foundItemRoutes')
const authRoutes = require('./authRoutes')
const lostItemRoutes = require('./lostItemRoutes')


const routes = [
    foundItemRoutes,
    authRoutes,
    lostItemRoutes
]

module.exports = routes