import type { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "src/utils/token.js";
import { UnauthorizedError } from "src/utils/errors.js";
import { logger } from "src/config/logger.js";
import path from "path";

const log = logger.child(path.basename(import.meta.url, ".js"));

/**
 * Express middleware that authenticates incoming requests via a Bearer JWT.
 *
 * Reads the `Authorization` header, verifies the access token, and attaches
 * the decoded user payload to `req.user`. Calls `next` with an
 * `UnauthorizedError` if the header is missing, malformed, or the token is
 * invalid/expired.
 *
 * @param req  - Incoming Express request. Must carry an `Authorization: Bearer <token>` header.
 * @param _res - Express response (unused).
 * @param next - Express next function; called with an error on auth failure.
 */
export function authenticate(req: Request, _res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    log.warn(
      `Authentication failed: missing Bearer token [${req.method} ${req.path}]`,
    );
    return next(new UnauthorizedError("Missing token"));
  }
  try {
    const token = authHeader.split(" ")[1];
    if (!token) {
      log.warn(
        `Authentication failed: empty token [${req.method} ${req.path}]`,
      );
      return next(new UnauthorizedError("Missing token"));
    }
    req.user = verifyAccessToken(token);
    log.debug(
      `Authenticated user ${req.user.userId} [${req.method} ${req.path}]`,
    );
    next();
  } catch {
    log.warn(
      `Authentication failed: invalid or expired token [${req.method} ${req.path}]`,
    );
    next(new UnauthorizedError("Invalid or expired token"));
  }
}
