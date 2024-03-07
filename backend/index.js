import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import authRouter from "./routes/Auth.js";
import classroomRouter from "./routes/Classroom.js";
import teacherRouter from "./routes/Teacher.js";
import userRouter from "./routes/User.js";
import bodyParser from "body-parser";

import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(
  "/thumbnails",
  express.static(path.join(__dirname, "public/thumbnails"))
);
app.use("/assets", express.static(path.join(__dirname, "public/assets")));
app.use("/database", express.static(path.join(__dirname, "public/database")));

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.error("MongoDB connection error:", err)); // Improved error handling

app.get("/test", (req, res) => {
  res.status(200).send("Server Working Fine!"); // Sending response with status code
});

app.use("/api/auth", authRouter);
app.use("/api/classrooms", classroomRouter);
app.use("/api/teachers", teacherRouter);
app.use("/api/users", userRouter);

// Global error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

app.listen(port, () => {
  console.log(`Server started at PORT ${port}`);
});
