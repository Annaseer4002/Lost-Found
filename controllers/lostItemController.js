const mongoose = require ('mongoose')
const LostItem = require('../models/lostItemModel')
const { matchedItems } = require('../services/matchItemService')





const HandleReportLostItem = async (req, res) => {
   
  try {
         
     const {name, description, image, location} = req.body

     userId = req.user._id
     
 
     
 
     if(!name){
         return res.status(400).json({message:'item name is required'})
     }
 
        if(!description){
         return res.status(400).json({message:'item describion is rwquired'})
     }
 
     const lostItem = new LostItem ({
         userId,
         name,
         description,
         image,
         location
     })
 
 
 
     await lostItem.save()
     
     const Matched = await matchedItems(req.body)

     res.status(201).json({
        message: "Lost item reported successfully",
        lostItem,
        Matched
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

const HandleDeleteLostItemReport = async (req, res) => {
    try {

        const { id } = req.params

        if(!id) {
            return res.status(400).json({message:'id is required'})
        }

        const isFound = await LostItem.findById(id)

        if(!isFound) {
            return res.status(404).json({message:'Lost item not found'})
        }
        
        // checks if the item is found befor deletion
        if(isFound.status !== 'found'){
            return res.status(400).json({
                message:'can not delete this report, item is not found'
            })
        }

    // find the item by id and delete
        const deletedLostReport = await LostItem.findByIdAndDelete( id )

        res.status(200).json({
            message:'Report deleted successful'
        })
        
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const HandleUpdateLostItemToFound = async (req, res) => {
    
    try {

        const { id } = req.params

    if(!id){
        return res.status(400).json({
            message:'id is required'
        })
    }

        const markFound = await LostItem.findById(id)

        // if(!markFound){
        //     return res.status(404).json({
        //         message:'lost report not found'
        //     })

        markFound.status = 'found'
        await markFound.save()
        res.status(200).json({
            message:'Lost item marked as found successfully',
            markFound
        })


    
          
        }
        
    catch (error) {
        res.status(500).json(error.message)
    }



}

module.exports = {
    HandleReportLostItem,
    HandleGetAllLostItems,
    HandleDeleteLostItemReport,
    HandleUpdateLostItemToFound
}