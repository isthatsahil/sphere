import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "../db/schema.js";
const { Pool } = pg;
import dotenv from "dotenv";
import { logger } from "./logger.js";
import path from "path";

const log = logger.child(path.basename(import.meta.url, ".js"));

dotenv.config();
if (!process.env.DATABASE_URL) {
  log.error("DATABASE_URL environment variable is not set");
  throw new Error("DATABASE_URL environment variable is not set");
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

log.info("Database pool initialized");

export const db = drizzle(pool, { schema });
