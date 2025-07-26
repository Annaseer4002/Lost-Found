const mongoose = require('mongoose');
const Auth = require('../models/authModel');
const Jwt = require('jsonwebtoken');

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



const Authorization = async (req, res, next) => {

    const token = req.header('Authorization');


    if(!token) {
        return res.status(401).json({message: "Access denied, no token provided"});
    }
    
    // console.log(token)

    try {

        const splitToken = token.split(" ")
        // console.log(splitToken);

        const realToken = splitToken[1]
        // console.log(realToken);
        
        
        const decoded = Jwt.verify(realToken, process.env.ACCESS_TOKEN)
        // console.log(decoded);
       

        if(!decoded) {
            return res.status(401).json({message: "Invalid token"});
        }

       req.user = decoded.user
        //  console.log(req.user);
        //  console.log(req.user.username)


        next()
        
        
    } catch (error) {
        return res.status(500).json(error.message)
    }

}


const isAdmin = async (req, res, next) => {

   
    try {

            if(req.user.role !== 'admin'){
            return res.status(403).json({message: "Access denied, admin only"});
        }

        next()
   
    } catch (error) {
        return res.status(500).json(error.message)
    }

}

module.exports = {
    validateSignUp,
    Authorization,
    isAdmin
}