const mongoose = require('mongoose')

const reportLostItemService = async(req, res) => {

     try {
        
    const {itemname, description, image} = req.body

    if(!itemname){
        return res.status(400).json({message:'item name is required'})
    }

       if(!description){
        return res.status(400).json({message:'item describion is rwquired'})
    }

    const lostItem = new Item({
        itemname,
        description,
        image,
        userId,
        dateLost,
        isFound
    })



await lostItem.save()

return lostItem

res.status(201).json({
    message:'Report success',
    lostItem
})
    


        
     } catch (error) {
        res.status(500).json(error.message)
     }


}

module.exports = {
    reportLostItemService
}