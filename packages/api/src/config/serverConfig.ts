import dotenv from "dotenv";
import type { SERVER_Config } from "../types/config.js";

dotenv.config();

const serverConfig: SERVER_Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  jwtSecret: process.env.JWT_SECRET || "dev-secret-change-in-prod",
  jwtRefreshSecret:
    process.env.JWT_REFRESH_SECRET || "dev-refresh-secret-change-in-prod",
  accessTokenExpiry: 3 * 24 * 60 * 60 * 1000,
  refreshTokenExpiry: 7 * 24 * 60 * 60 * 1000,
  MAX_AGE: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
};

export default serverConfig;
