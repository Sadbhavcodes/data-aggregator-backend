// 1. Import necessary libraries
import express, { Request,Response } from "express";
import dotenv from 'dotenv';
import connectDB from "./config/db";

// 2. Load enviroment variables
dotenv.config();

// 3. Connect to the database
connectDB();

// 4. Create instance of app
const app = express(); 
app.use(express.json());

// 5. Connect computer to the required port
const port = process.env.port || 3000; 

// 6. app.get( URL_PATH, CALLBACK_FUNCTION ) when someone hits URL_PATH do that callback function
app.get('/', (req: Request, res: Response) => {
  res.send('Server Running'); 
})   

// 7. It start the app at port 3000
app.listen(port, () => {
  console.log(`Server running on ${port}`); 
})