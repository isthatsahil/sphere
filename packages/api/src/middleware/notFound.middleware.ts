import type { Response, Request, NextFunction } from "express";
import { NotFoundError } from "src/utils/errors.js";
import { logger } from "src/config/logger.js";
import path from "path";

const log = logger.child(path.basename(import.meta.url, ".js"));

export function notFound(req: Request, _res: Response, next: NextFunction) {
  log.warn(`Route not found: ${req.method} ${req.path}`);
  return next(new NotFoundError(`Route not found: ${req.method} ${req.path}`));
}
