import type { NextFunction, Request, Response } from "express";
import path from "path";
import { logger } from "src/config/logger.js";
import { contactService } from "./contacts.service.js";

export const contactsController = {
  searchContacts: async (req: Request, res: Response, next: NextFunction) => {
    const log = logger.child(path.basename(import.meta.url, ".js"));
    try {
      log.info(`Initiating search contacts`);
      const { searchTerm } = req.body;
      const contact = await contactService.searchService(
        searchTerm,
        req.user?.userId,
      );
      return res.status(200).json({ data: { contact: contact } });
    } catch (error) {
      log.error(error instanceof Error ? error : new Error(String(error)));
      return next(error);
    }
  },
};
