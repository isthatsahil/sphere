import type { Response, Request, NextFunction } from "express";
import { NotFoundError } from "src/utils/errors.js";

export function notFound(req: Request, _res: Response, next: NextFunction) {
  return next(new NotFoundError(`Route not found: ${req.method} ${req.path}`));
}
