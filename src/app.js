

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
        // console.log(data);
        await user.save();
        res.send("user added Successfully");
    }catch(error){
        console.error("Error saving user:", error);
        res.status(500).send(error.errmsg);
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
        res.status(400).send(err.errmsg);
    }
});

app.delete("/user", async (req,res)=>{
    const userId = req.body.userId;
    try{
        const user = await User.findByIdAndDelete(userId);
        res.send("user deleted successfully");

    }catch{
        res.status(400).send("Something went wrong!");
    }
});

// update user profile
app.patch("/user/:userid", async (req,res)=>{
    const data = req.body;
    const userId = req.params.userid;
    try{

        const ALLOWED_UPDATES = ["photourl", "about","skills","lastName","firstName"]

        const isUpdateAllowed = Object.keys(data).every((k)=>
            ALLOWED_UPDATES.includes(k)
        );

        if(!isUpdateAllowed){
            throw new Error("Update Not allowed!");
        }
        if(data?.skills.length > 10){
            throw new Error ("Skills cant me more than 10");
        }
        await User.findByIdAndUpdate({_id: userId}, data,{
            returnDocument:"after",
            runValidators: true
        });
        res.send("User updated successfully!");        
    }
    catch(err){
        res.status(400).send("Update Faild!"+ err.message);
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



