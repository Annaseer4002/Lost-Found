const mongoose = require('mongoose');
const Item = require('../models/foundItemModel');
const LostItem = require('../models/lostItemModel');
const sendMatchedItemsMail = require('../utils/sendMatchedItemsMail');



const matchedItems = async (lostItems, foundItems) => {

  try {

      const lostItems = await LostItem.find({status: 'pending'}).populate('userId', 'username email')
        const foundItems = await Item.find({claimed: 'unclaimed'}).populate('userId', 'username email');
        const matches = [];
        for (let lostItem of lostItems) {
          for (let item of foundItems) {

            const score = 0;
            
            if(lostItem.name.toLowerCase().includes(item.name.toLowerCase())){
              score += 30
            }

            if(lostItem.description.toLowerCase().slice(0, 10).includes(item.description.toLowerCase())){
              score += 30
            }

            if(lostItem.location.toLowerCase().slice(0, 10).includes(item.location.toLowerCase())){
              score += 30
            }

            if(lostItem.dateLost.includes(item.date)){
              score += 10
            }

            if(score => 60){
              await sendMatchedItemsMail(lostItem.email, [item])
            }

          }
        }

        matches.push(item)


    
  } catch (error) {
    throw error;
    
  }

}
    
        
    
      
  


module.exports = matchedItems;