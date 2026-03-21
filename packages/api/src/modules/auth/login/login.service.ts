import { logger } from "src/config/logger.js";
import path from "path";
import { loginRepository } from "./login.repository.js";

const log = logger.child(path.basename(import.meta.url, ".js"));
import { UnauthorizedError } from "src/utils/errors.js";
import { verifyPassword } from "src/utils/utils.js";
import { generateAccessToken, generateRefreshToken } from "src/utils/token.js";
import serverConfig from "src/config/serverConfig.js";
import { tokenRepository } from "../shared/token.repository.js";

export const loginService = {
  login: async (identifier: string, password: string) => {
    log.info(`Login attempt for identifier: ${identifier}`);
    const user = await loginRepository.findByIdentifier(identifier);

    if (!user) throw new UnauthorizedError("Invalid credentials");

    const isPasswordValid = await verifyPassword(password, user.passwordHash);
    if (!isPasswordValid) throw new UnauthorizedError("Invalid credentials");

    const payload = {
      userId: user.id,
      email: user.email,
      username: user.username,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);
    const expiresAt = new Date(Date.now() + serverConfig.MAX_AGE);

    await tokenRepository.saveRefreshToken(user.id, refreshToken, expiresAt);
    log.info(`User ${user.id} logged in successfully`);
    return { accessToken, refreshToken, user };
  },
};
