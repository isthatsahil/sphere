import type { NextFunction, Request, Response } from "express";
import { logger } from "src/config/logger.js";
import { userService } from "./users.service.js";

export const userController = {
  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, username, password } = req.body;
      const user = await userService.register(email, username, password);
      return res.status(201).json({ user });
    } catch (error) {
      logger.error(error instanceof Error ? error : new Error(String(error)));
      return next(error);
    }
  },
};
