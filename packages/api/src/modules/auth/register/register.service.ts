import { ConflictError } from "src/utils/errors.js";
import { registerRepository } from "./register.repository.js";
import { hashPassword } from "src/utils/utils.js";
import { logger } from "src/config/logger.js";

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
    return registerRepository.createUser(email, username, hashedPassword);
  },
};
