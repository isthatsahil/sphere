import { logger } from "src/config/logger.js";
import path from "path";
import type { TokenPayload } from "src/types/tokens.js";

const log = logger.child(path.basename(import.meta.url, ".js"));
import { UnauthorizedError } from "src/utils/errors.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "src/utils/token.js";
import { tokenRepository } from "../shared/token.repository.js";
import serverConfig from "src/config/serverConfig.js";

export const refreshService = {
  refresh: async (token: string) => {
    let payload: TokenPayload;
    try {
      // Verify the refresh token and extract the payload
      payload = verifyRefreshToken(token);
    } catch (error) {
      log.error(error instanceof Error ? error : new Error(String(error)));
      throw new UnauthorizedError("Invalid or expired refresh token");
    }

    const existingToken = await tokenRepository.findRefreshToken(token);
    if (!existingToken) {
      // Token already rotated or revoked — possible reuse attack
      log.warn(`Refresh token not found in database: ${token}`);
      throw new UnauthorizedError("Invalid refresh token");
    }

    // Token is valid and exists in DB, proceed to rotate it
    const newAccessToken = generateAccessToken({
      userId: payload?.userId,
      email: payload?.email,
    });

    const newRefreshToken = generateRefreshToken({
      userId: payload?.userId,
      email: payload?.email,
    });

    const expiresAt = new Date(Date.now() + serverConfig.MAX_AGE);

    await tokenRepository.deleteRefreshToken(token);
    await tokenRepository.saveRefreshToken(
      payload?.userId,
      newRefreshToken,
      expiresAt,
    );

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  },
};
