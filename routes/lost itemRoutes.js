const express = require('express')
const { Authorization } = require('../middlewares/authMiddleware')
const { HandleReportLostItem } = require('../controllers/lost itemController')

const Router = express.Router()

Router.post('/report-lost-item', Authorization, HandleReportLostItem)
