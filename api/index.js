import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();

const app = express();

////////////////////////////////////////////////
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database Connected !!!");
  })
  .catch((err) => {
    console.log(` Database connection Failed ${err}`);
  });
/////////////////////////////////////////////////

const port = 3000;

app.listen(port, () => {
  console.log(`server is running on port ${port}!!`);
});
