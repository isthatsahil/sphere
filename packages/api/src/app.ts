import express, { urlencoded } from "express";
import { errorHandler } from "./middleware/errorHandler.middleware.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { notFound } from "./middleware/notFound.middleware.js";
import dotenv from "dotenv";
import { logger } from "./config/logger.js";
import v1Router from "./routes/v1/index.js";
import path from "path";

dotenv.config();

const app = express();
const log = logger.child(path.basename(import.meta.url, ".js"));
log.info("Starting API server...");

app.use(urlencoded({ extended: true }));

app.use(
  cors({
    origin: [process.env.ORIGIN ?? "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.json());

app.use("/api/v1", v1Router);

app.use(notFound);
app.use(errorHandler);

export default app;
