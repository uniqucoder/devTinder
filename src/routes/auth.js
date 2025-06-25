const express = require('express');
const {userAuth} = require('../middlewares/auth');
const validator = require('validator');
const {validateSignupData} = require('../utils/validator');
const authRouter = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');


authRouter.post("/signup", async (req,res)=>{
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

// login API
authRouter.post("/login", async(req,res)=>{
    console.log("Inside login");
    try{
        const {emailId, password} = req.body;
        // console.log(emailId);
        if(!validator.isEmail(emailId)){
            throw new Error("Invalid Credentials");
        }
        // Check User is Present in Database then Password Check
        const  user = await User.findOne({emailId:emailId});
        // console.log(user);
        if(!user){
            throw new Error("Invalid Credentials");
        }
        const isPasswordValid = await user.validatePassword(password);
        if(isPasswordValid){
            // Create JWT TOKEN
            const token = await  user.getJWT();
            console.log(token);
            // Send Token in cookies
            res.cookie("token", token);
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

module.exports = authRouter;