const mongoose = require ('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const HandleSignUp = async (req, res) => {
    const {username, email, password} = req.body;
    
    try {

        const hashedPassword = await bcrypt.hash(password, 12)

       const user = new Auth({
         username,
         email,
         password: hashedPassword
       }) 

       await user.save();

       res.status(201).json({
         message: 'User created successfully',
         user: {
            id: user?._id,
            username: user?.username,
            email: user?.email
         }
       })
        
    } catch (error) {
        res.status(500).json(error.message);
    }
}

module.exports = {
    HandleSignUp
}