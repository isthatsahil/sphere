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

const MAX_LOG_LENGTH = 2000;

/**
 * Sanitizes a log message string before it is written to any transport.
 *
 * Performs three transforms in order:
 *  1. Strip ANSI escape codes — prevent terminal colour injection
 *  2. Replace newlines/carriage returns — prevent fake log line injection
 *  3. Truncate — prevent large payloads from flooding log files
 *
 * @param message - Raw log message string.
 * @returns Sanitized string safe to write to log transports.
 */
export function sanitizeLogMessage(message: string): string {
  // 1. Strip ANSI escape codes (e.g. ESC[31mRed ESC[0m)
  const ansiPattern = new RegExp(String.fromCharCode(27) + "\\[[0-9;]*m", "g");
  // 2. Replace newlines/carriage returns to prevent log injection
  // 3. Truncate to prevent oversized log entries
  return message
    .replace(ansiPattern, "")
    .replace(/[\r\n]+/g, " | ")
    .slice(0, MAX_LOG_LENGTH);
}

/** Options for {@link sanitiseText}. */
export interface SanitiseTextOptions {
  /** Maximum allowed length — input is truncated to this. Default: 10 000. */
  maxLength?: number;
  /** Allow `\n` and `\r` through (e.g. for multi-line messages). Default: true. */
  allowNewlines?: boolean;
}

/**
 * Sanitises user-supplied text before it is stored or broadcast.
 *
 * Layers of protection (applied in order):
 *  1. Null-byte removal         — prevents DB / filesystem exploits
 *  2. Control-character strip   — removes invisible non-printable chars
 *                                 (optionally preserving `\n` / `\r` for
 *                                 multi-line messages)
 *  3. HTML entity encoding      — neutralises `< > & " '` to prevent XSS
 *                                 when content is rendered in a browser
 *  4. Trim                      — strips leading / trailing whitespace
 *  5. Length cap                — truncates oversized payloads
 *
 * Note: SQL-injection protection is handled by parameterised queries in the
 * ORM (Drizzle). This function is a defence-in-depth layer and should NOT be
 * relied upon as the sole guard against injection attacks.
 *
 * @param raw     - Untrusted text received from the client.
 * @param options - Optional tuning (maxLength, allowNewlines).
 * @returns Sanitised string safe for storage and rendering.
 *
 * @example
 * const message = sanitiseText(req.body.text);
 * const username = sanitiseText(req.body.username, { allowNewlines: false });
 */
export function sanitiseText(
  raw: string,
  { maxLength = 10_000, allowNewlines = true }: SanitiseTextOptions = {},
): string {
  // 1. Remove null bytes
  let text = raw.replace(/\0/g, "");

  // 2. Strip non-printable control characters (U+0001–U+001F, U+007F)
  //    Preserve \t (U+0009), and optionally \n (U+000A) / \r (U+000D)
  // Build control-character patterns dynamically to satisfy the no-control-regex ESLint rule.
  // allowNewlines=true  → keep \t (9), \n (10), \r (13); strip U+0001-U+0008, U+000B-U+000C, U+000E-U+001F, U+007F
  // allowNewlines=false → strip all of U+0001-U+001F plus U+007F
  const fc = String.fromCharCode;
  const ctrlPattern = allowNewlines
    ? `[${fc(1)}-${fc(8)}${fc(11)}${fc(12)}${fc(14)}-${fc(31)}${fc(127)}]`
    : `[${fc(1)}-${fc(31)}${fc(127)}]`;
  text = text.replace(new RegExp(ctrlPattern, "g"), "");

  // 3. HTML-encode characters that are dangerous in a browser context
  text = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");

  // 4. Trim surrounding whitespace
  text = text.trim();

  // 5. Enforce maximum length
  return text.slice(0, maxLength);
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
