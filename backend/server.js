import app from "./app.js";
import dotenv from "dotenv"
import mongoose from "mongoose";

dotenv.config()

const PORT = process.env.PORT || 5000;
const { DB_HOST } = process.env

mongoose
  .connect(DB_HOST)
  .then(() => {

    app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    });
    
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

