const express = require("express");
const mongoose = require("mongoose");
const Item = require("./itemModel");

const app = express()

app.use(express.json())

const PORT = 8000

const MONGODB_URL = "mongodb+srv://abdulnasir:2212101005@cluster0.ki0lmle.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(MONGODB_URL)
.then(()=>{
    console.log("Database Connected Successfully")

    app.listen(PORT,()=>{
        console.log(`Server started running at ${PORT}`);    
    })
})


// adding found items

app.post("/found-item", async (req, res)=>{

    const {name, description, location, date, claimed, image} = req.body

    
    const item = new Item({
        name, description, location, date, claimed, image
    })


    await item.save();

    res.status(201).json({message: "Found item reported successfully", item})
})


// view unclaimed items

app.get("/unclaimed-items", async (req, res)=>{

    
    const unclaimedItems = await Item.find({ claimed: false });
   
    res.status(200).json({
        message: "Success",
         unclaimedItems})
})

app.get("/One-item/:id", async (req, res)=>{

    const {id} = req.params;

    const item = await Item.findById(id);

    if(!item){
       return res.status(404).json({message: "item not found"})
    }
    res.status(200).json({
        message: "Success",
        item})


})

app.patch("/update-item/:id", async(req, res)=>{

    const {id} = req.params;

    const {claimed} = req.body;

    const updatedItem = await Item.findById(id);

    if(!updatedItem){
        return res.status(404).json({message: "item not found"})
    }

    res.status(200).json({
        message: "Success",
        updatedItem
    })

})

app.delete("/delete-item", async (req, res)=>{
    const {id} = req.body

    const deletedItem = await Item.findByIdAndDelete(id);

    res.status(200).json({message: "Deleted successfully"})
})