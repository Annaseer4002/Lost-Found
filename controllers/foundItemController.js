const mongoose = require('mongoose')
const Item = require("../models/foundItemModel");
const { allFoundItems } = require('../services/foundItemServices');

const LostItem = require('../models/lostItemModel');
const sendMatchedItemsMail = require('../utils/sendMatchedItemsMail');



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

    

    // check if it matched Lost items
    const lostItems = await LostItem.find({status:'pending'}).populate('userId', 'email')
      
    // const matches = [];

    for(lostItem of lostItems){
        //  const matches = [];


        let score = 0
        if(lostItem.name.toLowerCase().includes(item.name.toLowerCase())){
            score += 30
        }
        if(lostItem.description.toLowerCase().slice(0, 10).includes(item.description.toLowerCase())){
            score += 30
        }
        if(lostItem.location.toLowerCase().slice(0, 10).includes(item.location.toLowerCase())){
            score += 30
        }
        
        const dateDiff = Math.abs(new Date(lostItem.dateLost) - new Date(item.dateFound));
        const diffInDays = dateDiff / (1000 * 60 * 60 * 24);
        if (diffInDays <= 3) score += 10;

        if(score >= 60){
       console.log(item)
        //   matches.push(item)
         await sendMatchedItemsMail(lostItem.userId.email, item)

        }
 
    }
    
  
   

   

    res.status(201).json({
        message: "Found item reported successfully",
        item: {
            userId: item?.userId,
            id: item?._id,
            name: item?.name,
            description: item?.description,
            location: item?.location,
            date: item?.dateFound,
            claimed: item?.claimed,
            image: item?.image
        },
        possibleMatches: lostItem.length || "No matches found"
        // matchedItems
    })
}

const HandleFindUnclaimedItems = async (req, res) => {
    try {
        
        const unclaimedItems = await Item.find({ claimed: 'unclaimed' }).populate('userId', 'username email avatar');

        if(!unclaimedItems){
            return res.status(404).json({message: "No unclaimed items found"});
        }
   
        res.status(200).json({
          message: "Success",
          count: unclaimedItems.length,
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
         const {id} = req.params

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
            count: foundItems.length || 'no items found',
            foundItems
         })
        
    } catch (error) {
        res.status(500).json(error.message);
    }
   
}

const HandleSearchFoundItems = async (req, res) => {


    try {

         const searchTerm = req.query.q; // Get search term from query parameters

            if (!searchTerm) {
                return res.status(400).json({ error: 'Search term is required' });
            }

            try {
                // Perform database query based on the search term
                // Example with Mongoose:
                const results = await Item.find({ 
                    $or: [
                        { name: { $regex: searchTerm, $options: 'i' } },
                        { description: { $regex: searchTerm, $options: 'i' } },
                        { location: { $regex: searchTerm, $options: 'i' } }
                    ]
                });
                res.json(results);
            } catch (error) {
                console.error('Search error:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
        
    } catch (error) {
        res.status(500).json(error.message)
    }
  
          
        }



module.exports = {
    HandleReportFoundItem,
    HandleFindUnclaimedItems,
    HandleGetOneItem,
    HandleUpdateItemToClaimed,
    HandleDeleteItem,
    HandleFindAllFoundItems,
    HandleSearchFoundItems
}