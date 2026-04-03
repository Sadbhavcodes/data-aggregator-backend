import mongoose from 'mongoose';
import dotenv from 'dotenv';

// 1. Load enviroment variable
dotenv.config();

// 2. Define the mongo URI
const MONGO_URI = process.env.MONGO_URI;

// 3. Create the connection function
const connectDB = async () => {
    try{
        // 4. Wait for connection
        const conn = await mongoose.connect(MONGO_URI as string);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    }catch(error){
        console.error(`Error connecting to MongoDB: ${error}`);
        process.exit(1);
    }
};

export default connectDB;