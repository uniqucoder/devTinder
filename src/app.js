

const express = require("express");
const connectDB = require('./config/database');
const app = express();
const User = require('./models/user')
const validator = require('validator');
const {adminAuth} = require('./middlewares/auth');

const {validateSignupData} = require('./utils/validator')
const bcrypt = require('bcrypt');

// middleware to convert JSON to Javascript object
app.use(express.json());

app.post("/signup", async (req,res)=>{
    try{
        // Validation
        validateSignupData(req);

        const {firstName, lastName, emailId,password} = req.body;

        const passwordHash = await bcrypt.hash(password,10);
        console.log(passwordHash);


        // Encrypt the password
        const data = req.body;
        const user = new User({
            firstName, lastName,emailId, password :passwordHash
        });
        // console.log(data);
        await user.save();
        res.send("user added Successfully");
    }catch(error){
        console.error("Error :", error);
        res.status(500).send("Error :"+ error.message);
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

// login API
app.post("/login", async(req,res)=>{
    console.log("Inside login");
    try{

        const {emailId, password} = req.body;
        console.log(emailId);
        if(!validator.isEmail(emailId)){

            throw new Error("Invalid Credentials");
        }

        // Check User is Present in Database then Password Check
        const  user = await User.findOne({emailId:emailId});
        console.log(user);
        if(!user){
            throw new Error("Invalid Credentials");
        }


        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(isPasswordValid){
            console.log("Password valid");
            res.send("User Login Successfull");
        }
        else{
            throw new Error("Invalid Credentials");
        }

    }
    catch(error){
        res.status(400).send("Error : "+ error.message);
    }
})

// get all user API
app.post("/feed",async (req,res)=>{
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



