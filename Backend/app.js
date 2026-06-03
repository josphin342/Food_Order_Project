//to configure express & middleware
// import packages
//create express app
//configure middleware
//export app

//import express
const express=require('express');

//import middleware packages
const cors= require("cors")
const bodyParser=require("body-parser")
 const authRoutes= require("./routes/auth");

//create express application
 const app=express();

//user middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//basic route
/*app.get("/",(req,res)=>{
    res.send("server is running")
})*/


app.use("/api/user", authRoutes);

//export app
module.exports = app;