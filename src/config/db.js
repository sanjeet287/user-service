import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const baseurl=process.env.MONGODBURL ||'0.0.0.0:27017';
export const connectToDB=async()=>{
    try {
        await mongoose.connect(`mongodb://${baseurl}/userservice`);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('Error connecting to MongoDB:',error);        
    }    
}