const express = require('express')
const { Authorization } = require('../middlewares/authMiddleware')
const { HandleReportLostItem, HandleGetAllLostItems } = require('../controllers/lost itemController')

const Router = express.Router()

Router.post('/report-lost-item', Authorization, HandleReportLostItem)
Router.get('/all-lost-items', Authorization, HandleGetAllLostItems)

module.exports = Router
