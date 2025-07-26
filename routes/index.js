const express = require('express')
const Router = express.Router()
const foundItemRoutes = require('./found itemRoutes')
const authRoutes = require('./authRoutes')
const lostItemRoutes = require('./lost itemRoutes')


const routes = [
    foundItemRoutes,
    authRoutes,
    lostItemRoutes
]

module.exports = routes