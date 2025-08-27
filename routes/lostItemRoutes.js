const express = require('express')
const { Authorization, isAdmin } = require('../middlewares/authMiddleware')
const { HandleReportLostItem, HandleGetAllLostItems, HandleDeleteLostItemReport, HandleUpdateLostItemToFound, findLostItem, updateLostItem, HandleSearchLostItem } = require('../controllers/lostItemController')

const Router = express.Router()

Router.post('/report-lost-item', Authorization, HandleReportLostItem)
Router.get('/all-lost-items', Authorization, HandleGetAllLostItems)
Router.delete('/delete-item/:id', Authorization, isAdmin, HandleDeleteLostItemReport)
Router.patch('/update-lost-item-status/:id', Authorization, HandleUpdateLostItemToFound)
Router.get('/findLost-item/:id', Authorization, findLostItem )
Router.put('/update-lost-item/:id', Authorization, updateLostItem)
Router.get('/search-lost-items', HandleSearchLostItem)
module.exports = Router
