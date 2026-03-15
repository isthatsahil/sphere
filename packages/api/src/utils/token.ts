import jwt from "jsonwebtoken";
import serverConfig from "src/config/serverConfig.js";
import type { TokenPayload } from "src/types/tokens.js";

/**
 * Signs a JWT access token with the given payload.
 * Expiry is controlled by `serverConfig.accessTokenExpiry`.
 *
 * @param payload - Data to encode in the token (userId, email)
 * @returns Signed JWT access token string
 */
export const generateAccessToken = (payload: TokenPayload): string =>
  jwt.sign(payload, serverConfig.jwtSecret, {
    expiresIn: serverConfig.accessTokenExpiry,
  });

/**
 * Signs a JWT refresh token with the given payload.
 * Expiry is controlled by `serverConfig.refreshTokenExpiry`.
 *
 * @param payload - Data to encode in the token (userId, email)
 * @returns Signed JWT refresh token string
 */
export const generateRefreshToken = (payload: TokenPayload): string =>
  jwt.sign(payload, serverConfig.jwtRefreshSecret, {
    expiresIn: serverConfig.refreshTokenExpiry,
  });

/**
 * Verifies a JWT access token and returns its decoded payload.
 *
 * @param token - JWT access token string to verify
 * @returns Decoded `TokenPayload` if the token is valid
 * @throws `JsonWebTokenError` if the token is invalid or tampered
 * @throws `TokenExpiredError` if the token has expired
 */
export const verifyAccessToken = (token: string): TokenPayload =>
  jwt.verify(token, serverConfig.jwtSecret) as TokenPayload;

/**
 * Verifies a JWT refresh token and returns its decoded payload.
 *
 * @param token - JWT refresh token string to verify
 * @returns Decoded `TokenPayload` if the token is valid
 * @throws `JsonWebTokenError` if the token is invalid or tampered
 * @throws `TokenExpiredError` if the token has expired
 */
export const verifyRefreshToken = (token: string): TokenPayload =>
  jwt.verify(token, serverConfig.jwtRefreshSecret) as TokenPayload;
