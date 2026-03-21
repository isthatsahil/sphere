import { logger } from "src/config/logger.js";
import path from "path";
import { tokenRepository } from "../shared/token.repository.js";

const log = logger.child(path.basename(import.meta.url, ".js"));

export const logoutService = {
  logout: async (token: string): Promise<void> => {
    await tokenRepository.deleteRefreshToken(token);
    log.info("Refresh token revoked");
  },

  logoutAll: async (userId: number): Promise<void> => {
    await tokenRepository.deleteAllRefreshTokens(userId);
    log.info(`All sessions revoked for userId: ${userId}`);
  },
};
