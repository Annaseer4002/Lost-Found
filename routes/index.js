const express = require('express')
const Router = express.Router()
const itemRoutes = require('./itemRoutes')


const routes = [
    itemRoutes
]

module.exports = routes