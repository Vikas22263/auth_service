const express=require("express");
const {PORT}=require("./config/serverConfig")

const app= express();
console.log(PORT)

app.listen(PORT,()=>{
    console.log("server is running",PORT)
})