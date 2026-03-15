import type { Request, Response, NextFunction } from "express";
import { type ZodType, ZodError } from "zod";
import { ValidationError } from "src/utils/errors.js";
import { logger } from "src/config/logger.js";

export const validate =
  (schema: ZodType) =>
  async (req: Request, _res: Response, next: NextFunction) => {
    try {
      // Validates body, params, and query all at once
      await schema.parseAsync({
        body: req.body,
        params: req.params,
        query: req.query,
      });
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const message = err.issues
          .map((e) => {
            const field = e.path.slice(1).join("."); // removes 'body'/'params'/'query' prefix
            return field ? `${field}: ${e.message}` : e.message;
          })
          .join(", ");
        logger.error(`Validation error: ${message}`);
        return next(new ValidationError(message));
      }
      logger.error(err instanceof Error ? err : new Error(String(err)));
      next(err);
    }
  };
