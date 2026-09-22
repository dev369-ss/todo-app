const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const uri = process.env.MONGODB_URI
console.log("uri",uri)
const connectDB = async()=>{
   if(!uri){
      console.log("No Mongodb URI is found in .env")
   }
   try{

    await mongoose.connect(uri);
    console.log("DB connected")
   }catch(error){
      console.error("MongoDB connection failed:", error);
    process.exit(1);
   }
}

module.exports = connectDB;