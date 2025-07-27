const express = require('express')
const { Authorization } = require('../middlewares/authMiddleware')
const { HandleReportLostItem, HandleGetAllLostItems, HandleDeleteLostItemReport, HandleUpdateLostItemToFound } = require('../controllers/lostItemController')

const Router = express.Router()

Router.post('/report-lost-item', Authorization, HandleReportLostItem)
Router.get('/all-lost-items', Authorization, HandleGetAllLostItems)
Router.delete('/delete-item/:id', Authorization, HandleDeleteLostItemReport)
Router.patch('/update-lost-item-status/:id', Authorization, HandleUpdateLostItemToFound)

module.exports = Router
