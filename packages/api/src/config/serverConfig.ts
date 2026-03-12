import dotenv from "dotenv";
import type { SERVER_Config } from "../types/config.js";

dotenv.config();

const serverConfig: SERVER_Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
};

export default serverConfig;
