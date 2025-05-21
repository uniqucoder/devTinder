

const express = require("express");
const connectDB = require('./config/database');
const app = express();
const User = require('./models/user')
const {adminAuth} = require('./middlewares/auth');

// middleware to convert JSON to Javascript object
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

// find user by email
app.get("/user", async(req,res)=>{
    const userEmail = req.body.emailId;
    try{
        const user = await User.find({emailId: userEmail});  
        if(user.length === 0){
            res.status(404).send("User Not found");
        } 
        res.status(200).send(user); 
    }
    catch(err){
        res.status(400).send("Something went wrong");
    }


})

// get all user API
app.get("/feed",async (req,res)=>{
     try{
        const user = await User.find({});  
        if(user.length === 0){
            res.status(404).send("User Not found");
        } 
        res.status(200).send(user); 
    }
    catch(err){
        res.status(400).send("Something went wrong");
    }
});
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



