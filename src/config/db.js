import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const baseurl=process.env.MONGODBURL ||'127.0.0.1:27017';
console.log("MongoUrl comming from .env file: "+baseurl);

export const connectToDB=async()=>{
    try {
        console.log("MongoUrl before mongoose connection: "+baseurl);
        await mongoose.connect(`mongodb://${baseurl}/userservice`);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('Error connecting to MongoDB:',error.message);        
    }    
}