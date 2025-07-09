const express = require('express');

const requestRouter = express.Router();
const {userAuth} = require('../middlewares/auth');

const User = require('../models/user');
const ConnectionRequest = require('../models/connectionRequest');
requestRouter.post("/request/send/:status/:toUserId",userAuth, async(req,res)=> {
    try{
        console.log("inside this request");
        const status = req.params.status;
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId
        console.log(fromUserId +" "+ toUserId+ " " + status );

        // Validatoin
        const allowedStatus = ["ignored", "interested"];
        if(!allowedStatus.includes(status)){
            return res.json({
                message : "Invalid Status type :" + status
            })
        }

        
        // Check User exist or not
        const toUser =  await User.findById(toUserId);
        if(!toUser){
            return res.status(404).json({
                message : "User not found",
            });
        }

        // If there is an existing connection request
        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or :[
                {fromUserId,toUserId},
                {fromUserId : toUserId, toUserId : fromUserId}
            ]
        });

        if(existingConnectionRequest)
        {
            return res.send({message :"Connection Request is already Exist"});
        }




        const connectRequest = new ConnectionRequest({
            fromUserId,toUserId,status
        });

        const data = await connectRequest.save();

        if(!data){
            throw new Error("Connection request not sent");
        }
        return res.json({
            message : "Connection request Sent Successfully",
            data
        })
    }
    catch(err){
        res.status(400).send({error:err.message});
    }
})

module.exports = requestRouter;