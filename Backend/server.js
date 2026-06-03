//to start the server

//this file is going to load environment variables

// import app first
/*const app=require("./app")
const ConnectDatabase=require("./db")

//import dotenv to load environment variables from .env file
const dotenv=require("dotenv");

//configure dotenv to load variables from .env file
dotenv.config({path:"./config/config.env"})

//connet databse
ConnectDatabase();

//now start the server
const server=app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})*/

const app = require("./app")

const connectDatabase = require("./db")

//import dotenv 
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" })

//connect database
connectDatabase();

//start the server 

const server = app.listen(process.env.PORT,() =>{

        console.log(`Server is running at port ${process.env.PORT}`);
})