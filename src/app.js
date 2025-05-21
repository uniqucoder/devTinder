

const express = require("express");
const connectDB = require('./config/database');
const app = express();
const User = require('./models/user')
const {adminAuth} = require('./middlewares/auth');
app.use(express.json());

app.post("/signup", async (req,res)=>{
    try{
        const data = req.body;
        const user = new User(data);
        console.log(data);
        await user.save();
        res.send("user added Successfully");
    }catch(error){
        console.error("Error saving user:", error);
        res.status(500).send("Error saving user");
    }
    

    
})

connectDB()
.then(()=>{
    console.log('DB connected');
    app.listen(3000,()=>{
    console.log('Server is Running');
    });
})
.catch((err) =>{
    console.log("Error : DB Connect");
});



