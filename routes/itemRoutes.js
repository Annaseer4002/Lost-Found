const express = require ('express')
const { HandleReportFoundItem, HandleFindUnclaimedItems, HandleGetOneItem, HandleUpdateItemToClaimed, HandleDeleteItem } = require('../controllers/itemController')
const { Authorization } = require('../middlewares/authMiddleware')

const Router = express.Router()

Router.post('/found-item', HandleReportFoundItem)
Router.get('/unclaimed-items',  HandleFindUnclaimedItems)
Router.get('/one-item/:id', HandleGetOneItem)
Router.patch('/update-item/:id', HandleUpdateItemToClaimed)
Router.delete('/delete-item', HandleDeleteItem)

module.exports = Router