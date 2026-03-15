import { eq, or } from "drizzle-orm";
import { db } from "src/config/db.js";
import { users } from "src/db/schema.js";

export const userRepository = {
  /**
   * Finds a user by email or username.
   *
   * Used during registration to check for duplicates before inserting,
   * and during login to look up the account by either identifier.
   *
   * @param email - The email address to search for.
   * @param username - The username to search for.
   * @returns The matched user, or `null` if none found.
   */
  findByEmailOrUsername: async (email: string, username: string) => {
    return db
      .select()
      .from(users)
      .where(or(eq(users.email, email), eq(users.username, username)))
      .limit(1)
      .then((result) => result[0] || null);
  },

  /**
   * Inserts a new user into the database.
   *
   * Expects the password to already be hashed — never pass a plaintext
   * password directly to this method.
   *
   * @param email - The user's email address.
   * @param username - The user's chosen username.
   * @param passwordHash - The bcrypt hash of the user's password.
   * @returns The newly created user row.
   */
  createUser: async (email: string, username: string, passwordHash: string) => {
    return db
      .insert(users)
      .values({ email, username, passwordHash })
      .returning()
      .then((result) => result[0]);
  },
};
