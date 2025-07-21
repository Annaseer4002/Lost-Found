const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
    username: { type: String, required: true},
    email: { type: String, required: true, unique: true},
    phoneNumber: { type: Number, required: true},
    password: { type: String, required: true},
    role: { type: String, default: 'user' }
}, {timestamps: true})

module.exports = mongoose.model('Auth', authSchema)