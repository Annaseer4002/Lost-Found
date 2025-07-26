const mongoose = require('mongoose');
const Item = require('../models/found itemModel');

const allFoundItems = async (req, res) => {
    try {

        const allFoundItems = await Item.find();
         return allFoundItems;
        
    } catch (error) {
        res.status(500).json(error.message);
        
    }
}

module.exports = {
    allFoundItems
}