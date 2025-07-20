const mongoose = require ('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authModel = require('../models/authModel');

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
            email: user?.email,
            role: user?.user.role
         }
       })
        
    } catch (error) {
        res.status(500).json(error.message);
    }
}

const HandleLogin = async (req, res) => {
    const {email, password } = req.body
    
    try {

        
    if(!email){
      return  res.status(404).json({message:'Email is required'})
    }

      if(!password){
       return res.status(404).json({message:'Password is required'})
    }

    const user = await Auth.findOne({email})

    if(!user){
        return res.status(404).json({message: 'user account not found'})
    }

    const isMatch = await bcrypt.verify(password, user.password)

    if(!isMatch){
        return res.status(400).json({message:'Incorrect email or password'})
    }

    const token = jwt.sign(
         { user },
         process.env.ACCESS_TOKEN,
         { expiresIn: '1h' }   
    ) 

    const refreshToken = jwt.sign(
        { user: user._id },
        process.env.REFRESHTOKEN,
        { expiresIn: '1d' }
    )

    res.status(200).json({
        message:'Login successful',
        token,
        refreshToken,
        user: {
            email: user?.email,
            username: user?.username,
            role: user?.role

        }
    })



        
    } catch (error) {
        res.status(500).json(error.message)
    }
        
}

module.exports = {
    HandleSignUp,
    HandleLogin
}