//import mongoose package
const mongoose=require('mongoose');

// coonect db
const ConnectDatabase=() =>{
  mongoose.connect(process.env.MONGO_URI).then((con)=>{
    console.log(`mongodb connected with host: ${con.connection.host}`);

  }).catch((err)=>{
    console.error(err);
  });
}
module.exports=ConnectDatabase;