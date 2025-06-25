const express = require('express');

const profileRouter = express.Router();
const User = require('../models/user');
const {userAuth} = require('../middlewares/auth');

// Profile API
profileRouter.get("/profile",userAuth, async( req, res)=>{
    try{
        const user = req.user;
        res.send(user); 
    }
    catch(error){
        res.status(400).send("Error : "+ error.message);
    }
})

// find user by email
profileRouter.get("/user", async(req,res)=>{
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
module.exports = profileRouter;