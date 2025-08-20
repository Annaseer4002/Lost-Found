const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Auth', required: true},
    name: {type: String, require: true},
    description: {type: String, require: true},
    location: {type: String, require: true},
    dateFound: {type: Date, default: Date.now},
    claimed: {type: String, default: 'unclaimed', enum: ['claimed', 'unclaimed']},
    image: {type: String, default: ' '}
},{timeStamp: true})

const Item = new mongoose.model("Item", itemSchema);

module.exports = Item;