const jwt = require('jsonwebtoken')

const User = require("../models/user");
const userAuth = async(req,res,next)=>{
    
    try{
        const {token} = req.cookies;
        if(!token){
            throw new Error("Token is Not valid!!!");
        }
        const decodeObj = await jwt.verify(token, "DEV@TINDER$790");

        const {_id} = decodeObj;
        if(_id){
            const user = await User.findById(_id);
            if(!user){
                throw new Error("User Not Found!");
            }
            // console.log("User iS Valid" + user.firstName);
            req.user = user;
            next();
        }
    }catch(err){
        res.status(400).send("Error: "+ err.message);
    }

};


module.exports = {
    userAuth,
}