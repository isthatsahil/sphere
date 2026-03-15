import type { Response } from "express";

/**
 * Sets the `refreshToken` cookie on the HTTP response with security-hardened options.
 *
 * - `httpOnly` prevents client-side JavaScript from reading the cookie (XSS mitigation).
 * - `secure` ensures the cookie is only transmitted over HTTPS in production.
 * - `sameSite: "strict"` blocks the cookie from being sent on cross-site requests (CSRF mitigation).
 * - `path` scopes the cookie to auth endpoints only, so it is not sent on every request.
 * - Cookie expires after 7 days.
 *
 * @param res - The Express response object.
 * @param token - The refresh token string to store in the cookie.
 */
export function setRefreshCookie(res: Response, token: string): void {
  res.cookie("refreshToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
    path: "/api/v1/auth",
  });
}

/**
 * Clears the `refreshToken` cookie from the HTTP response.
 *
 * The `path` must exactly match the one used in {@link setRefreshCookie},
 * otherwise the browser will not remove the cookie.
 *
 * @param res - The Express response object.
 */
export function clearRefreshCookie(res: Response): void {
  res.clearCookie("refreshToken", { path: "/api/v1/auth" });
}
