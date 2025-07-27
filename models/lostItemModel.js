const mongoose = require('mongoose')

const lostItemSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Auth', required: true},
    itemname: { type: String, required: true },
    description: { type: String, required: true },
    image: {type: String, default:' '},
    dateLost: { type: Date, default: Date.now},
    status: { type: String, default: 'pending', enum: ['pending', 'found'] }

    
}, { timestamps: true
})

const LostItem = new mongoose.model ('LostItem', lostItemSchema)

module.exports = LostItem