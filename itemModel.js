const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    name: {type: String, require: true},
    description: {type: String, require: true},
    location: {type: String, require: true},
    date: {type: Date, require: true},
    claimed: {type: Boolean, default: false},
    image: {type: String, default: false}
},{timeStamp: true})

const Item = new mongoose.model("item", itemSchema);

module.exports = Item;