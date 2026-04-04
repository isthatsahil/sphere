import type { NextFunction, Request, Response } from "express";
import path from "path";
import { logger } from "src/config/logger.js";
import { profileService } from "./profile.service.js";

export const profileController = {
  getUploadSignature: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const log = logger.child(path.basename(import.meta.url, ".js"));
    try {
      log.info(`Initiating getUploadSignature() in controller`);
      const result = await profileService.getUploadSignature(req.user?.userId);
      return res.status(200).json({ data: result });
    } catch (error) {
      log.error(error instanceof Error ? error : new Error(String(error)));
      return next(error);
    }
  },
  updateProfile: async (req: Request, res: Response, next: NextFunction) => {
    const log = logger.child(path.basename(import.meta.url, ".js"));
    try {
      const { firstName, lastName, bio, avatar } = req.body;
      const updated = await profileService.updateProfile(req.user?.userId, {
        firstName,
        lastName,
        bio,
        avatar,
      });
      return res.status(200).json({ data: { user: updated } });
    } catch (error) {
      log.error(error instanceof Error ? error : new Error(String(error)));
      return next(error);
    }
  },
};
