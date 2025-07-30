const mongoose = require('mongoose');
const Item = require('../models/foundItemModel');
const LostItem = require('../models/lostItemModel');

const matchedItems = async (req, res) => {


    try {

        const items = await Item.find({claimed: 'unclaimed'})

        const matches = []

      

        for (let item of items) {
              let score = 0

              if(req.body.name.toLowerCase().includes(item.name.toLowerCase()) ||
              item.name.toLowerCase().includes(req.body.name.toLowerCase()))
              {
                score += 30
              }

               if(req.body.description.slice(0, 10).toLowerCase().includes(item.description.slice(0, 10).toLowerCase()) ||
              item.description.slice(0, 10).toLowerCase().includes(req.body.description.slice(0, 10).toLowerCase()))
              {
                score += 30
              }
              
              if(req.body.location.slice(0, 10).toLowerCase().includes(item.location.slice(0, 10).toLowerCase()) ||
                item.location.slice(0, 10).toLowerCase().includes(req.body.location.slice(0, 10).toLowerCase()))
                {
                    score += 30
                }

                if (score >= 60){
                    matches.push({item, score})
                }
        }
        if (matches.length === 0) {
            return res.status(404).json({ message: 'No matches found' });
        }
        matches.sort((a, b) => b.score - a.score);

        return res.status(200).json({ matches });

        
    } catch (error) {
        res.status(500).json({ message: error.message });
        
    }
    
}

module.exports = {
  matchedItems
}