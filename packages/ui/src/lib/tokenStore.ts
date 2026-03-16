/**
 * * Pure in-memory module closure.
 * * Access token lives in the JS heap,
 * * not window or localStorage —
 * * inaccessible to injected XSS scripts.
 */

/**
 * * Why not localStorage:
 * * Any injected script can read
 * * localStorage.getItem('token').
 * * A module-scoped let variable is
 * * not reachable from the browser console
 * * or external scripts.
 * * The refresh token is already safe
 * * (HttpOnly cookie) —
 * * this protects the access token.
 */

export interface TokenStore {
  getAccessToken(): string | null;
  setAccessToken(token: string): void;
  clearAccessToken(): void;
}

let _accessToken: string | null = null;

export const tokenStore: TokenStore = {
  getAccessToken: () => _accessToken,
  setAccessToken: (token: string) => {
    _accessToken = token;
  },
  clearAccessToken: () => {
    _accessToken = null;
  },
};
