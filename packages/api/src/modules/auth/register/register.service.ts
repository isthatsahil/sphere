import { ConflictError } from "src/utils/errors.js";
import { registerRepository } from "./register.repository.js";
import { hashPassword } from "src/utils/utils.js";
import { logger } from "src/config/logger.js";
import { generateAccessToken, generateRefreshToken } from "src/utils/token.js";
import { tokenRepository } from "../shared/token.repository.js";

export const registerService = {
  register: async (email: string, username: string, password: string) => {
    logger.info(
      `Attempting to register user with email: ${email}, username: ${username}`,
    );
    const existingUser = await registerRepository.findByEmailOrUsername(
      email,
      username,
    );
    if (existingUser) {
      logger.error(
        `Registration failed: email or username already exists (email: ${email}, username: ${username})`,
      );
      throw new ConflictError("Email or username already exists");
    }
    const hashedPassword = await hashPassword(password);
    const user = await registerRepository.createUser(
      email,
      username,
      hashedPassword,
    );

    const payload = { userId: user.id, email: user.email };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await tokenRepository.saveRefreshToken(user.id, refreshToken, expiresAt);

    return { user, accessToken, refreshToken };
  },
};
