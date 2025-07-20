const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const Item = require("./models/itemModel");
const routes = require("./routes");

const app = express()

app.use(cors());
app.use(express.json())


const PORT = process.env.PORT || 8000;


mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
    console.log("Database Connected Successfully")

    app.listen(PORT,()=>{
        console.log(`Server started running at ${PORT}`);    
    })
})

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Welcome to Lost and Found API"
    })
})

app.use('/api', routes)