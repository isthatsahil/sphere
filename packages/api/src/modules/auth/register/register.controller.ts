import type { NextFunction, Request, Response } from "express";
import { logger } from "src/config/logger.js";
import { registerService } from "./register.service.js";

export const registerController = {
  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, username, password } = req.body;
      const user = await registerService.register(email, username, password);
      return res.status(201).json({ user });
    } catch (error) {
      logger.error(error instanceof Error ? error : new Error(String(error)));
      return next(error);
    }
  },
};
