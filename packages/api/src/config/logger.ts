import winston from "winston";
import fs from "fs";
import path from "path";
import { maskSensitiveData, sanitizeLogMessage } from "src/utils/utils.js";

type LogLevel = "error" | "warn" | "info" | "debug";

const VALID_LOG_LEVELS: LogLevel[] = ["error", "warn", "info", "debug"];

// Ensure the logs directory exists before winston tries to write to it
const logsDir = path.resolve("logs");
fs.mkdirSync(logsDir, { recursive: true });

const printfTemplate = winston.format.printf(
  ({ timestamp, level, message }) => `[${timestamp}] ${level}: ${message}`,
);

const fileFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  printfTemplate,
);

const consoleFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.colorize(),
  printfTemplate,
);

class Logger {
  private static instance: Logger;
  private logger: winston.Logger;

  private constructor(level: LogLevel = "info") {
    this.logger = winston.createLogger({
      levels: {
        error: 0,
        warn: 1,
        info: 2,
        debug: 3,
      },
      level,
      transports: [
        new winston.transports.Console({
          format: consoleFormat,
          stderrLevels: ["error"],
        }),
        new winston.transports.File({
          filename: path.join(logsDir, "app.log"),
          format: fileFormat,
        }),
      ],
    });
  }

  static getInstance(): Logger {
    if (!Logger.instance) {
      const raw = process.env.LOG_LEVEL ?? "info";
      const level = VALID_LOG_LEVELS.includes(raw as LogLevel)
        ? (raw as LogLevel)
        : "info";

      if (!VALID_LOG_LEVELS.includes(raw as LogLevel)) {
        console.warn(
          `[logger] Invalid LOG_LEVEL "${raw}", defaulting to "info"`,
        );
      }

      Logger.instance = new Logger(level);
    }
    return Logger.instance;
  }

  private prepare(message: string): string {
    return maskSensitiveData(sanitizeLogMessage(message));
  }

  info(message: string) {
    this.logger.info(this.prepare(message));
  }

  warn(message: string) {
    this.logger.warn(this.prepare(message));
  }

  debug(message: string) {
    this.logger.debug(this.prepare(message));
  }

  error(message: string | Error) {
    const raw =
      message instanceof Error
        ? `${message.message}\n${message.stack}`
        : message;
    this.logger.error(this.prepare(raw));
  }
}

export const logger = Logger.getInstance();
