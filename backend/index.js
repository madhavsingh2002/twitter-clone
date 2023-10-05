import express from "express";
import mongoose from "mongoose";
import { MONGODB_URL } from "./config.js";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/authUser.js";
import tweetRoutes from "./routes/tweets.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
mongoose.connect(MONGODB_URL);
mongoose.connection.on("connected", () => {
  console.log("DB connected");
});
mongoose.connection.on("error", (error) => {
  console.log("Some error while connecting to DB");
});
app.get("/", (req, res) => {
  res.send("hello world");
});
app.use(cookieParser());
app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/tweets", tweetRoutes);
app.use("/api/auth", authRoutes);

app.listen(8000, () => {
  console.log("listening to port 8000");
});
