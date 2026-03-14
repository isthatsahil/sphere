import express, { urlencoded } from "express";
import { errorHandler } from "./middleware/errorHandler.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { notFound } from "./middleware/notFound.js";
import dotenv from "dotenv";
import { logger } from "./config/logger.js";
dotenv.config();

const app = express();
logger.info("Starting API server...");
// Middleware to parse JSON bodies
app.use(urlencoded({ extended: true }));

// Enable CORS for all routes
app.use(
  cors({
    origin: [process.env.ORIGIN ?? "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.json());

// Middleware to hanlde errors
app.use(notFound);
app.use(errorHandler);

export default app;
