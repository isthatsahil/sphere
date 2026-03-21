import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/errors.js";
import { logger } from "src/config/logger.js";
import path from "path";

const log = logger.child(path.basename(import.meta.url, ".js"));

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction, // must be declared even if unused
): void => {
  if (err instanceof AppError) {
    log.warn(`${err.name} [${err.statusCode}]: ${err.message}`);
    res.status(err.statusCode).json({
      error: err.name,
      message: err.message,
      statusCode: err.statusCode,
    });
    return;
  }

  // Unexpected errors — don't leak internals
  log.error(err);
  res.status(500).json({
    error: "InternalServerError",
    message: "Something went wrong",
    statusCode: 500,
  });
};
