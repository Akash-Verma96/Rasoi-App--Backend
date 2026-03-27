import express from "express";
import authRouter from "./routes/authRouter.js";
import ConnectDb from "./config/database.js";
import dotenv from "dotenv";
import cors from 'cors'
import cookie_Parser from 'cookie-parser'
import profileRouter from "./routes/profileRouter.js";
import addMealRouter from "./routes/addMealRouter.js";
import restaurantRouter from "./routes/restaurantRouter.js";
import orderRouter from "./routes/orderRouter.js";

const app = express();

app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))

dotenv.config(); // used to take variable value from .env file middleware
app.use(express.json()) // To read json data sent by client middleware
app.use(cookie_Parser()) // --> used to get token from client side generaly client use res.cookie.token to get token
app.use("/uploads", express.static("uploads"));

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", addMealRouter);
app.use("/", restaurantRouter);
app.use("/", orderRouter);



const port = process.env.PORT;

ConnectDb().then(() => {
  console.log("Database Connection Successfull...");
  app.listen(port, () => {
  console.log(`App is listening on port 3000 `);
  });
})
.catch(error => {
    console.log("Database Connection failed...", error)
})
