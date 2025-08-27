const express = require ('express')
const { HandleReportFoundItem, HandleFindUnclaimedItems, HandleGetOneItem, HandleUpdateItemToClaimed, HandleDeleteItem, HandleFindAllFoundItems, HandleSearchFoundItems } = require('../controllers/foundItemController')
const { Authorization, isAdmin } = require('../middlewares/authMiddleware')

const Router = express.Router()

Router.post('/found-item', Authorization, HandleReportFoundItem)
Router.get('/unclaimed-items', Authorization,  HandleFindUnclaimedItems)
Router.get('/one-item/:id', HandleGetOneItem)
Router.patch('/update-item/:id', HandleUpdateItemToClaimed)
Router.delete('/delete-item', Authorization, isAdmin, HandleDeleteItem)
Router.get('/all-found-items', Authorization, isAdmin, HandleFindAllFoundItems)
Router.get('/search-found-items',  HandleSearchFoundItems)

module.exports = Router