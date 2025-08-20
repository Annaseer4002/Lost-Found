const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
    username:
     { type: String,
     required: true},

    email:
    { type: String, 
    required: true, 
    unique: true},

    phoneNumber: {
    type: Number, 
    required: true},

    password: {
    type: String, 
    required: true},

    role: {
    type: String, 
    default: 'user' },

    avatar: {
        type: String,
        default: "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png"
    }

}, {timestamps: true})

module.exports = mongoose.model('Auth', authSchema)