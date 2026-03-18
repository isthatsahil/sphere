import type { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "src/utils/errors.js";
import { refreshService } from "./refresh.service.js";
import { setRefreshCookie } from "src/utils/cookies.js";
import { logger } from "src/config/logger.js";

export const refreshController = {
  refresh: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req?.cookies?.refreshToken as string | undefined;
      if (!token) throw new UnauthorizedError("No refresh token");

      const { accessToken, refreshToken } = await refreshService.refresh(token);
      setRefreshCookie(res, refreshToken);

      return res.status(200).json({ data: { accessToken } });
    } catch (error) {
      logger.error(error instanceof Error ? error : new Error(String(error)));
      next(error);
    }
  },
};
