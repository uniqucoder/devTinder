const express = require('express');

const requestRouter = express.Router();
const {userAuth} = require('../middlewares/auth');

requestRouter.post("/sendConnectionRequest",userAuth, async(req,res)=> {
    try{
        const user = req.user;
        console.log("Send a Connection request!");
        res.send("Connection Req Sent by "+ user.firstName);
    }
    catch(err){
        res.status(400).send("Error: ",err.message);
    }
})

module.exports = requestRouter;