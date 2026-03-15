import type { NextFunction, Request, Response } from "express";
import { logger } from "src/config/logger.js";
import { registerService } from "./register.service.js";
import { setRefreshCookie } from "src/utils/cookies.js";
import type { RegisterInput } from "./register.schema.js";

export const registerController = {
  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, username, password } = req.body as RegisterInput;
      const { user, accessToken, refreshToken } =
        await registerService.register(email, username, password);
      setRefreshCookie(res, refreshToken);
      return res.status(201).json({ accessToken, user });
    } catch (error) {
      logger.error(error instanceof Error ? error : new Error(String(error)));
      return next(error);
    }
  },
};
