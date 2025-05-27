const mongoose = require('mongoose');

const userSchema =  mongoose.Schema ({
    firstName : {
        type : String,
        required: true
    },
    lastName : {
        type : String
    },
    emailId : {
        type: String,
        lowercase: true,
        required: true,
        unique : true
    },
    password :{
        type: String,
        required : true
    },
    age : {
        type: Number,
        min: 18
    },
    gender:{
        type: String,
        
        validate(value){
            if(!(["male","female","other"].includes(value))){
                throw new Error("Gender is not valid");
            }
        }
    },
    photourl:{
        type: String,
        default:"https://www.dreamstime.com/default-profile-picture-avatar-photo-placeholder-vector-illustration-default-profile-picture-avatar-photo-placeholder-vector-image189495158"
    },
    about:{
        type: String,
        default: "This is default about of user"
    },
    skills: {
        type : [String],
        validate(value){
            if(value.length > 5){
                throw new Error("Only 5 skills Allowed");
            }
        }
    }
},{
    timestamps: true
})

const User = mongoose.model("User",userSchema );

module.exports = User;