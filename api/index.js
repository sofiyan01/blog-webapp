import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import userRouter from "./routes/user.router.js"
import authRouter from "./routes/auth.router.js"
import morgan from "morgan"
dotenv.config();

const app = express();


mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database Connected !!!");
  })
  .catch((err) => {
    console.log(` Database connection Failed ${err}`);
  });
/////////////////////////////////////////////////




app.use(morgan("common"))
app.use(express.json());
app.use("/api/user",userRouter)
app.use("/api/auth",authRouter)

////////

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({ success: false, message });
});




const port = 3000;

app.listen(port, () => {
  console.log(`server is running on port ${port}!!`);
});
