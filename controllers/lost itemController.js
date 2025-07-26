const mongoose = require ('mongoose')
const Item = require('../models/found itemModel')
const { reportLostItemService } = require('../services/lostItemServices')



const HandleReportLostItem = async (req, res) => {
   
    const lostItem = await reportLostItemService()

    res.status(201).json({
    message:'Report success',
    lostItem
})
    
}

module.exports = {
    HandleReportLostItem
}