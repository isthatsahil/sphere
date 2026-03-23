import type { NextFunction, Request, Response } from "express";
import { logger } from "src/config/logger.js";
import path from "path";
import { loginService } from "./login.service.js";
import { setRefreshCookie } from "src/utils/cookies.js";
import type { LoginInput } from "./login.schema.js";

export const loginController = {
  login: async (req: Request, res: Response, next: NextFunction) => {
    const log = logger.child(path.basename(import.meta.url, ".js"));
    try {
      log.info(`loginController started`);
      const { identifier, password } = req.body as LoginInput;
      const { accessToken, refreshToken, user } = await loginService.login(
        identifier,
        password,
      );
      setRefreshCookie(res, refreshToken);
      return res.status(200).json({ data: { accessToken, user } });
    } catch (error) {
      log.error(error instanceof Error ? error : new Error(String(error)));
      return next(error);
    }
  },
};
