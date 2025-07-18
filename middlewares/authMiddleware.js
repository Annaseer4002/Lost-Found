const mongoose = require('mongoose');
const authModel = require('../models/authModel');

const validateSignUp = async (req, res, next) => {

    const {username, email, password} = req.body;

    if (!username) {
        return res.status(400).json({message: "Username is required"});
    }

    if(!email) {
        return res.status(400).json({message: "Email is required"});
    }

    if(!password) {
        return res.status(400).json({message: "Password is required"});
    }

    const existingUser = await Auth.findOne({ email});

    if(existingUser) {
        return res.status(400).json({message: "Email already exists"}); 
    }

    next();
}

module.exports = {
    validateSignUp
}