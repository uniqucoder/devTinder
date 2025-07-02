const express = require('express');

const profileRouter = express.Router();
const User = require('../models/user');
const {userAuth} = require('../middlewares/auth');
const {validateProfileEditData} = require('../utils/validator');

// Profile API
profileRouter.get("/profile/view",userAuth, async( req, res)=>{
    try{
        const user = req.user;
        res.send(user); 
    }
    catch(error){
        res.status(400).send("Error : "+ error.message);
    }
})

// find user by email
// profileRouter.get("/profile/view/", async(req,res)=>{
//     const userEmail = req.body.emailId;
//     try{
//         const user = await User.find({emailId: userEmail});  
//         if(user.length === 0){
//             res.status(404).send("User Not found");
//         } 
//         res.status(200).send(user); 
//     }
//     catch(err){
//         res.status(400).send("Something went wrong");
//     }


// })

profileRouter.patch("/profile/edit", userAuth, async(req,res)=>{
    // Validate profile edit data
    console.log("Inside the profile Router");
    console.log(req);
    try{
        if(!validateProfileEditData(req)){
            console.log("Invalid edit reques");
            res.status(400).send("Invalide edit request");
        }

        const loggedInUser = req.user;

        Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

        console.log(loggedInUser);
        res.send(` ${loggedInUser.firstName} your profile Updated Successfully`);
    }
    catch (err){
        res.status(400).send("Error ",err.message);
    }

})
module.exports = profileRouter;