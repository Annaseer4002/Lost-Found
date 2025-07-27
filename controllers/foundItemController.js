const mongoose = require('mongoose')
const Item = require("../models/foundItemModel");
const { allFoundItems } = require('../services/foundItemServices');


const HandleReportFoundItem = async (req, res) => {
       const {name, description, location, image} = req.body

    // Validate required fields
    if (!name) {
        return res.status(400).json({ message: "Please provide all required fields" });
    }

    if(!description){
        return res.status(400).json({ message: "Description is required" });
    }

    if(!location) {
        return res.status(400).json({ message: "Location is required" });
    }

    
    const item = await new Item({
        name, 
        description, 
        location, 
        image,
        userId: req.user._id
    })


    await item.save();

    res.status(201).json({
        message: "Found item reported successfully",
        item: {
            userId: item?.userId,
            id: item?._id,
            name: item?.name,
            description: item?.description,
            location: item?.location,
            date: item?.date,
            claimed: item?.claimed,
            image: item?.image
        }
    })
}

const HandleFindUnclaimedItems = async (req, res) => {
    try {
        
        const unclaimedItems = await Item.find({ claimed: 'false' }).populate('userId', 'username email');

        if(!unclaimedItems){
            return res.status(404).json({message: "No unclaimed items found"});
        }
   
        res.status(200).json({
          message: "Success",
          unclaimedItems})        



    } catch (error) {
        res.status(500).json(error.message);
    }
}

const HandleGetOneItem = async (req, res) => {
    const {id} = req.params;
    
    try {

      const item = await Item.findById(id);

    if(!item){
       return res.status(404).json({message: "item not found"})
    }
    res.status(200).json({
        message: "Success",
        item})




   }catch(error) {
     res.status(500).json(error.message);
}
  
}

const HandleUpdateItemToClaimed = async (req, res) => {
      const {id} = req.params;


    try {

     const updatedItem = await Item.findById(id);

    if(!updatedItem){
        return res.status(404).json({message: "item not found"})
    }

    updatedItem.status = 'Claimed'

    await updatedItem.save()

    res.status(200).json({
        message: "Success",
        updatedItem
    })

        
    } catch (error) {
        res.status(500).json(error.message);
    }

}

const HandleDeleteItem = async (req, res) => {
    try {
         const {id} = req.body

    const deletedItem = await Item.findByIdAndDelete(id);

    res.status(200).json({message: "Deleted successfully"})
        
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const HandleFindAllFoundItems = async (req, res) => {
    try {

         const foundItems = await allFoundItems();

         res.status(200).json({
            message: 'Success',
            foundItems
         })
        
    } catch (error) {
        res.status(500).json(error.message);
    }
   
}



module.exports = {
    HandleReportFoundItem,
    HandleFindUnclaimedItems,
    HandleGetOneItem,
    HandleUpdateItemToClaimed,
    HandleDeleteItem,
    HandleFindAllFoundItems
}