import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/errors.js";
import { logger } from "src/config/logger.js";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction, // must be declared even if unused
): void => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      error: err.name,
      message: err.message,
      statusCode: err.statusCode,
    });
    return;
  }

  // Unexpected errors — don't leak internals
  logger.error(err);
  res.status(500).json({
    error: "InternalServerError",
    message: "Something went wrong",
    statusCode: 500,
  });
};
