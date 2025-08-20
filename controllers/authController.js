const mongoose = require ('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Auth = require('../models/authModel');


const HandleSignUp = async (req, res) => {
    const {username, email, password, phoneNumber} = req.body;
    
    try {

        const hashedPassword = await bcrypt.hash(password, 12)

       const user = new Auth({
         username,
         email,
         password: hashedPassword,
         phoneNumber, 
       }) 

       await user.save();

       res.status(201).json({
         message: 'User created successfully',
         user: {
            id: user?._id,
            username: user?.username,
            email: user?.email,
            phoneNumber: user?.phoneNumber,
            role: user?.role,
            avatar: user?.avatar
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

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
        return res.status(400).json({message:'Incorrect email or password'})
    }

    const token = jwt.sign(
         { user },
         process.env.ACCESS_TOKEN,
         { expiresIn: '5h' }   
    ) 

    const refreshToken = jwt.sign(
        { user: user._id },
        process.env.REFRESH_TOKEN,
        { expiresIn: '1d' }
    )

    res.status(200).json({
        message:'Login successful',
        token,
        refreshToken,
        user: {
            id: user?._id,
            username: user?.username,
            email: user?.email,
            phoneNumber: user?.phoneNumber,
            role: user?.role,
            avatar: user?.avatar
        }
    })



        
    } catch (error) {
        res.status(500).json(error.message)
    }
        
}

const forgotPassword = async (req, res) => {
        try {
            const {email} = req.body
            const user = await Auth.findOne({email})
            if(!user) return res.status(400).json({msg: "This email does not exist."})

            // const access_token = createAccessToken({id: user._id})
            // const url = `${CLIENT_URL}/user/reset/${access_token}`

            sendMail(email, url, "Reset your password")
            res.json({msg: "Re-send the password, please check your email."})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
const resetPassword = async (req, res) => {
        try {
            const {password} = req.body
            // console.log(password)
            const passwordHash = await bcrypt.hash(password, 12)

            await Auth.findOneAndUpdate({_id: req.user.id}, {
                password: passwordHash
            })

            res.json({msg: "Password successfully changed!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }

const logout = async (req, res) => {
        try {
            res.clearCookie('refreshtoken', {path: '/user/refresh_token'})
            return res.json({msg: "Logged out."})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }

const HandleFindAllUsers = async (req, res) => {
    
    try {
        
        const allUsers = await Auth.find().select('-password')
       
        if(allUsers.length === 0){
            return res.status(404).json({message: "No users found"})
        }

        res.status(200).json({
            message: "Success",
            count: allUsers.length || 'No users found',
            allUsers
        })
        

   
        
    } catch (error) {
        res.status(500).json(error.message);
    }
   
}

const findUserInfo = async (req, res) => {
     try {
            const user = await Auth.findById(req.user.id).select('-password')

            res.json(user)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
}

const updateUserProfile = async (req, res) => {
        try {
            const {username, avatar} = req.body
            await Auth.findOneAndUpdate({_id: req.user.id}, {
                username, avatar
            })

            res.json({msg: "Update Success!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
const updateUsersRole = async (req, res) => {
        try {

          

         const user = await Auth.findOneAndUpdate({_id: req.params.id}, 
              {$set: {role: "admin"}} 
            )

            res.json(
                {msg: "Update Success!",
                       user: {
                    id: user?._id,
                    username: user?.username,
                    email: user?.email,
                    phoneNumber: user?.phoneNumber,
                    role: user?.role,
                    avatar: user?.avatar
                }
                }
              )
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }

const HandleDeleteUser = async (req, res) => {
    const {id} = req.params;

    try {

        if(!id){
            return res.status(400).json({message: "Please provide user id"})
        }

        const deletedUser = await Auth.findByIdAndDelete(id);

        if(!deletedUser){
            return res.status(404).json({message: "User not found"})
        }

        res.status(200).json({
            message: "User deleted successfully",
            deletedUser
        })

    } catch (error) {
        res.status(500).json(error.message);
    }
}

module.exports = {
    HandleSignUp,
    HandleLogin,
    HandleFindAllUsers,
    HandleDeleteUser,
    forgotPassword,
    resetPassword,
    logout,
    findUserInfo,
    updateUserProfile,
    updateUsersRole
}
