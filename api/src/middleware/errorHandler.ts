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
  if (err.name === "ValidationError") {
    res.status(400).json({ message: err.message });
    return;
  }

  if (err.name === "UnauthorizedError") {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  res.status(500).json({ message: "Internal Server Error" });
};
