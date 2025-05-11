

const express = require("express");

const app = express();

const {adminAuth} = require('./middlewares/auth');


app.use("/admin",adminAuth);
app.get('/admin/getdata',(req,res)=>{
    res.send("Data sent");
})
app.get('/user',(req,res)=>{
    res.send({"First Name": "Chaitanya", "Last Name": "Tupsamudre"});
})

app.post('/user',(req,res,next)=>{

    res.send("Post Api Call");
    next();
    },
    (req,res)=>{
        res.send("2nd Response!!");
    }
);

app.delete('/user',(req,res)=>{
    res.send("Delete user");
})



app.use((req,res)=>{
    res.send("Hello From server!");
})
app.listen(3000,()=>{
    console.log("Server is Successfully Listning on port 3000");
});