import type { Response, Request, NextFunction } from "express";
import CustomError from "./customError.js";

export function notFound(req: Request, res: Response, next: NextFunction) {
  return next(
    new CustomError({
      name: "routeNotFound",
      message: "Route not found",
      statusCode: 404,
    }),
  );
}
