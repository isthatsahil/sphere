import { logger } from "src/config/logger.js";
import { tokenRepository } from "../shared/token.repository.js";

export const logoutService = {
  logout: async (token: string): Promise<void> => {
    await tokenRepository.deleteRefreshToken(token);
    logger.info("Refresh token revoked");
  },

  logoutAll: async (userId: number): Promise<void> => {
    await tokenRepository.deleteAllRefreshTokens(userId);
    logger.info(`All sessions revoked for userId: ${userId}`);
  },
};
