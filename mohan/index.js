import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
// import { logger } from "./middleware/logger.js";
import morgan from "morgan";

import gradeRouter from "./src/router/gradeRouter.js";
import studentRouter from "./src/router/studentRouter.js";

import fs from "fs";

const __dirname = path.resolve();
const __filename = fileURLToPath(import.meta.url);

morgan.token("type", function (req, res) {
  return req.headers["content-type"];
});

const logger = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flags: "a",
});

const PORT = process.env.PORT || 3500;

const app = express();

dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("App connected to MongoDB");
  } catch (error) {
    throw error;
    // console.log("DB Connection failed",error);
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("Disconnected");
});

mongoose.connection.on("connected", () => {
  console.log("Connected");
});

// app.use(logger)
app.use(
  morgan(
    ":method :url :status :res[content-length] :response-time ms :date[web] :type",
    { stream: logger }
  )
);

app.use(express.json());

app.use(cors());

app.use("/", express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  connect();
  console.log(`app connect to backend port running on ${PORT}`);
});

app.use("/api/grade", gradeRouter);
app.use("/api/student", studentRouter);
