

const express = require("express");

const app = express();
app.use((req,res)=>{
    res.send("Hello From server!");
})
app.listen(3000,()=>{
    console.log("Server is Successfully Listning on port 3000");
});