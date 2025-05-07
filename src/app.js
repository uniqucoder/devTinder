

const express = require("express");

const app = express();


app.get('/user',(req,res)=>{
    res.send({"First Name": "Chaitanya", "Last Name": "Tupsamudre"});
})

app.post('/user',(req,res)=>(
    res.send("Post Api Call")
));

app.delete('/user',(req,res)=>{
    res.send("Delete user");
})



app.use((req,res)=>{
    res.send("Hello From server!");
})
app.listen(3000,()=>{
    console.log("Server is Successfully Listning on port 3000");
});