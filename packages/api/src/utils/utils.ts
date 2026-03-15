import bcrypt from "bcrypt";

const SALT_ROUNDS = 12;

/**
 * Hashes a plaintext password using bcrypt.
 *
 * A cryptographically random salt is generated and embedded into the
 * resulting hash automatically — no separate salt management needed.
 *
 * @param plainText - The raw password to hash.
 * @returns The bcrypt hash string to store in the database.
 *
 * @example
 * const passwordHash = await hashPassword("mySecret123");
 */
export async function hashPassword(plainText: string): Promise<string> {
  return bcrypt.hash(plainText, SALT_ROUNDS);
}

/**
 * Verifies a plaintext password against a stored bcrypt hash.
 *
 * Extracts the salt from the stored hash, re-hashes the plaintext, and
 * compares the result. The original password is never recoverable.
 *
 * @param plainText - The raw password from the login attempt.
 * @param hash - The bcrypt hash stored in the database.
 * @returns `true` if the password matches, `false` otherwise.
 *
 * @example
 * const isMatch = await verifyPassword("mySecret123", user.passwordHash);
 * if (!isMatch) throw new UnauthorizedError("Invalid credentials");
 */
export async function verifyPassword(
  plainText: string,
  hash: string,
): Promise<boolean> {
  return bcrypt.compare(plainText, hash);
}
