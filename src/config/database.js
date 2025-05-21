const mongoose = require("mongoose");

const  connectDB = async ()=> {
    await mongoose.connect(
        "mongodb+srv://root:admin@namstenode.exw2k7h.mongodb.net/devTinder");
};

module.exports = connectDB;