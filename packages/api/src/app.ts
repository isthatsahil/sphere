import express from "express";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

app.use(errorHandler);

export default app;
