const mongoose = require ('mongoose')
const LostItem = require('../models/lost itemModel')





const HandleReportLostItem = async (req, res) => {
   
  try {
         
     const {itemname, description, image} = req.body

     userId = req.user._id
 
     
 
     if(!itemname){
         return res.status(400).json({message:'item name is required'})
     }
 
        if(!description){
         return res.status(400).json({message:'item describion is rwquired'})
     }
 
     const lostItem = new LostItem ({
         userId,
         itemname,
         description,
         image
     })
 
 
 
     await lostItem.save()

     res.status(201).json({
        message: "Lost item reported successfully",
        lostItem
     })
 

 
 
 
 
         
      } catch (error) {
         res.status(500).json(error.message)
      }
 
 
    
}

const HandleGetAllLostItems = async (req, res) => {
    
    try {

        const allLostItems = await LostItem.find().populate('userId', 'username email')

        res.status(200).json({
            message: 'All lost items retrieved successfully',
            allLostItems
        })
        
    } catch (error) {
        res.status(500).json(error.message);
    }
}

module.exports = {
    HandleReportLostItem,
    HandleGetAllLostItems
}