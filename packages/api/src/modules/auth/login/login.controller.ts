import type { NextFunction, Request, Response } from "express";
import { logger } from "src/config/logger.js";
import { loginService } from "./login.service.js";
import { setRefreshCookie } from "src/utils/cookies.js";

export const loginController = {
  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { identifier, password } = req.body;
      const { accessToken, refreshToken, user } = await loginService.login(
        identifier,
        password,
      );
      setRefreshCookie(res, refreshToken);
      return res.status(200).json({ accessToken, user });
    } catch (error) {
      logger.error(error instanceof Error ? error : new Error(String(error)));
      return next(error);
    }
  },
};
