const mongoose = require('mongoose')

const lostItemSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Auth', required: true},
    itemname: { type: String, required: true },
    description: { type: String, required: true },
    image: {type: String, default:' '},
    dateLost: { type: Date, default: Date.now},
    isFound: { type: String, default: 'Not found', enum: ['Not found', 'Found'] }

    

})

module.exports = new mongoose.Model("LostItem", lostItemSchema)