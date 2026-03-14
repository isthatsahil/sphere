import type { NextFunction, Request, Response } from "express";
import { logger } from "src/config/logger.js";
import CustomError from "src/middleware/customError.js";

export const signup = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
  } catch (error: unknown) {
    logger.error(error instanceof Error ? error : new Error(String(error)));
    return next(
      new CustomError({
        name: "SignupFailed",
        message: "Signup failed",
        statusCode: 500,
      }),
    );
  }
};
