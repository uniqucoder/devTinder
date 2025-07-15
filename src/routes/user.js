const express = require('express');

const userRouter = express.Router();

const {userAuth} = require('../middlewares/auth');

const User = require('../models/user');
const ConnectionRequest = require('../models/connectionRequest');

const user_safe_data = "firstName lastName skills age gender";
// Get ALL Pending Connection Request for logged in user

userRouter.get('/user/requests/received', userAuth, async(req,res)=>{

    try{
        const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequest.find({
            toUserId : loggedInUser._id,
            
        }).populate("fromUserId", user_safe_data)
        .populate("toUserId", user_safe_data);

        return res.json({
            message : "Data Fetch Successfully",
            data : connectionRequests
        })
    }
    catch(err){
        res.status(400).send("Error : "+ err.message);
    }
})

userRouter.get('/user/connections', userAuth, async (req,res)=>{

    try{
        const loggedInUser = req.user;

        const connectionRequest = await ConnectionRequest.find({
            
            $or:[
                { toUserId : loggedInUser._id, status : "accepted"},
                { fromUserId : loggedInUser._id, status : "accepted"}

            ]
           

        }).populate("fromUserId",user_safe_data)
        .populate("toUserId",user_safe_data);

        const data  = connectionRequest.map((row)=> {
            if(row.fromUserId._id === loggedInUser._id)
            {
                return row.toUserId;
            }
            else{
                return row.fromUserId;
            }
            
        });
        
        res.json({
            message :"Your Matched Fetch successfull",
            data : data
        })
    }
    catch(err)
    {
        res.status(400).send("Error : " + err.message);
    }
})

module.exports = {userRouter};