import { ConflictError } from "src/utils/errors.js";
import { userRepository } from "./users.repository.js";
import { hashPassword } from "src/utils/utils.js";
import { logger } from "src/config/logger.js";

export const userService = {
  register: async (email: string, username: string, password: string) => {
    logger.info(
      `Attempting to register user with email: ${email}, username: ${username}`,
    );
    const existingUser = await userRepository.findByEmailOrUsername(
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
    return userRepository.createUser(email, username, hashedPassword);
  },
};
