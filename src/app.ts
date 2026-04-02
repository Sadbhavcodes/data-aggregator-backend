import express, { Request,Response } from "express"; // 1. Import necessary libraries

const app = express(); // 2. Create instance of app
const port = process.env.port || 3000; // 3. Connect computer to the required port

app.get('/', (req: Request, res: Response) => {
  res.send('Server Running'); 
})   // 4. app.get( URL_PATH, CALLBACK_FUNCTION ) when someone hits URL_PATH do that callback function

app.listen(port, () => {
  console.log(`Server running on ${port}`); // 5. It start the app at port 3000
})