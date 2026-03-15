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

// Fields whose values will be replaced with [REDACTED] in all log output
const SENSITIVE_FIELDS = [
  "password",
  "passwordHash",
  "token",
  "accessToken",
  "refreshToken",
  "authorization",
  "secret",
  "apiKey",
];

/**
 * Masks sensitive field values in a log message string.
 *
 * Handles two formats:
 *  - Plain text:  `password: secret123`   → `password: [******]`
 *  - JSON:        `"password":"secret123"` → `"password":"[******]"`
 */
export function maskSensitiveData(message: string): string {
  let masked = message;

  for (const field of SENSITIVE_FIELDS) {
    // JSON format: "field":"value" or "field": "value"
    masked = masked.replace(
      new RegExp(`"${field}"\\s*:\\s*"[^"]*"`, "gi"),
      `"${field}":"[******]"`,
    );

    // Plain text format: field: value (up to comma, closing brace, or end of line)
    masked = masked.replace(
      new RegExp(`(${field})\\s*:\\s*([^,\\s}\\)]+)`, "gi"),
      `$1: [******]`,
    );
  }

  return masked;
}
