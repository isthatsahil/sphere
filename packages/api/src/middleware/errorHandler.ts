import type { NextFunction, Request, Response } from "express";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction, // must be declared even if unused
): void => {
  console.error(err.stack);

  // Handle specific error types
  if (err.name === "validationError") {
    res.status(400).json({ message: err.message, statusCode: 400 });
    return;
  }

  if (err.name === "routeNotFound") {
    res.status(404).json({ message: err.message, statusCode: 404 });
    return;
  }
  if (err.name === "Unauthorized Error") {
    res.status(401).json({ message: "Unauthorized", statusCode: 401 });
    return;
  }

  res
    .status(500)
    .json({ message: err.message || "Internal Server Error", statusCode: 500 });
};
