import type { NextFunction, Request, Response } from "express";
import { logger } from "src/config/logger.js";
import path from "path";
import { logoutService } from "./logout.service.js";
import { clearRefreshCookie } from "src/utils/cookies.js";

const log = logger.child(path.basename(import.meta.url, ".js"));

export const logoutController = {
  logout: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req?.cookies?.refreshToken as string | undefined;
      if (token) {
        await logoutService.logout(token);
      } else {
        log.debug("Logout called with no refresh token in cookie");
      }
      clearRefreshCookie(res);
      return res.status(204).send();
    } catch (error) {
      log.error(error instanceof Error ? error : new Error(String(error)));
      next(error);
    }
  },
};
