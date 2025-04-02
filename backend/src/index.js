import dotenv, { config } from "dotenv";
config({
  path: "./.env",
});

import app from "./app.js";
import cors from "cors";
import cookieParser from "cookie-parser";

// Local Files
import connectDB from "./db/db.js";

// Routes Files
import healthCheckRoute from "./routes/health-check.routes.js";

const PORT = process.env.PORT || 8080;


app.use(cors({
  origin: "*",
  credentials: true
}));
app.use(cookieParser())

app.use("/api/v1", healthCheckRoute);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on https://localhost:${PORT}/`);
});