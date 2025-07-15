

const express = require("express");
const connectDB = require('./config/database');
const app = express();
const cookieParser = require('cookie-parser');

// middleware to convert JSON to Javascript object
app.use(express.json());
app.use(cookieParser());


// Import all router here

const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/requests');
const { userRouter } = require("./routes/user");


app.use("/", authRouter);
app.use("/",profileRouter);
app.use("/", requestRouter);
app.use("/",userRouter);

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



