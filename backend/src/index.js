import dotenv, { config } from "dotenv";
config({
  path: "./.env",
});
import express from 'express'
import app from "./app.js";
import cors from "cors";
import cookieParser from "cookie-parser";

// Local Files
import connectDB from "./db/db.js";

// Routes Files
import healthCheckRoute from "./routes/health-check.routes.js";
import authRoute from "./routes/auth.routes.js";
import userRoute from "./routes/user.routes.js";
import projectRoute from "./routes/project.routes.js";
import noteRoute from "./routes/note.routes.js";
import taskRoute from "./routes/task.routes.js";

const PORT = process.env.PORT || 8080;

app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/v1", healthCheckRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/project", projectRoute);
app.use("/api/v1/project", noteRoute);
app.use("/api/v1/project", taskRoute);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on https://localhost:${PORT}/`);
});
