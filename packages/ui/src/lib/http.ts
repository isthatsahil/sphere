import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
  type AxiosResponse,
  type AxiosError,
} from "axios";

import { SERVER_CONFIG, API_ROUTES, LOGIN_ROUTES } from "@/utils/constant";
import { tokenStore } from "./tokenStore";
import { useAuthStore } from "@/stores/authStore";

/** Supported API versions. */
type ApiVersion = "v1" | "v2";

/**
 * Extends {@link InternalAxiosRequestConfig} with a retry flag to prevent
 * infinite refresh loops when a token refresh itself returns 401.
 */
interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  /** `true` after the first automatic token-refresh retry has been attempted. */
  _retry?: boolean;
}

/**
 * Creates a pre-configured Axios instance for the given API version.
 *
 * Features:
 * - Automatically attaches the in-memory access token as a `Bearer` header.
 * - Intercepts 401 responses and attempts a silent token refresh via the
 *   refresh endpoint (HttpOnly cookie is sent automatically via `withCredentials`).
 * - Queues concurrent requests that arrive while a refresh is in-flight and
 *   replays them with the new token once the refresh succeeds.
 * - Redirects to the login page when the refresh itself fails or the refresh
 *   endpoint returns 401 (i.e. the session is truly expired).
 *
 * @param version - API version to target. Defaults to `"v1"`.
 * @returns A configured {@link AxiosInstance} bound to the versioned base URL.
 *
 * @example
 * // Prefer importing the pre-built singleton over calling this directly.
 * import { httpV1 } from "@/lib/http";
 * const data = await httpV1.get("/users");
 */
export function createBaseClient(version: ApiVersion = "v1"): AxiosInstance {
  const instance = axios.create({
    baseURL: `${SERVER_CONFIG.serverUrl}${API_ROUTES.base}/${version}`,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  });

  // ✅ State is scoped per-instance, not shared globally
  let isRefreshing = false;
  const refreshQueue: Array<{
    resolve: (token: string) => void;
    reject: (error: unknown) => void;
  }> = [];

  /**
   * Resolves or rejects every queued request after a token refresh attempt.
   *
   * @param error - The refresh error, or `null` on success.
   * @param token - The new access token on success, or `null` on failure.
   */
  function processQueue(error: unknown, token: string | null): void {
    refreshQueue.forEach(({ resolve, reject }) =>
      error ? reject(error) : resolve(token!),
    );
    refreshQueue.length = 0; // ✅ mutate in-place, works with const
  }

  instance.interceptors.request.use(
    (cfg: InternalAxiosRequestConfig) => {
      const token = tokenStore.getAccessToken();
      if (token) cfg.headers.set("Authorization", `Bearer ${token}`);
      return cfg;
    },
    (error) => Promise.reject(error),
  );

  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as RetryableRequestConfig;

      if (error.response?.status !== 401) return Promise.reject(error);

      const isRefreshCall = originalRequest.url === API_ROUTES.auth.refresh;
      if (originalRequest._retry || isRefreshCall) {
        tokenStore.clearAccessToken();
        useAuthStore.getState().clearUser();
        window.location.href = LOGIN_ROUTES.login;
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          refreshQueue.push({ resolve, reject });
        }).then((newToken) => {
          originalRequest.headers.set("Authorization", `Bearer ${newToken}`);
          return instance(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await instance.post<{ accessToken: string }>(
          API_ROUTES.auth.refresh,
        );
        const newToken = data.accessToken;
        tokenStore.setAccessToken(newToken);
        processQueue(null, newToken);
        originalRequest.headers.set("Authorization", `Bearer ${newToken}`);
        return instance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        tokenStore.clearAccessToken();
        useAuthStore.getState().clearUser();
        window.location.href = LOGIN_ROUTES.login;
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    },
  );

  return instance;
}

/**
 * Unauthenticated Axios instance for auth endpoints (login, register).
 * No refresh interceptor — these calls are made before a session exists.
 * 4xx errors are rejected as-is so mutation `onError` handlers can extract
 * the server message and surface it to the user.
 */
function createAuthClient(version: ApiVersion = "v1"): AxiosInstance {
  const instance = axios.create({
    baseURL: `${SERVER_CONFIG.serverUrl}${API_ROUTES.base}/${version}`,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  });
  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => Promise.reject(error),
  );
  return instance;
}

/**
 * Authenticated Axios instance for API v1.
 * Attaches Bearer tokens and handles silent token refresh on 401.
 *
 * This is a module-level singleton — ES module caching guarantees that all
 * imports across the app receive the same instance, preserving the shared
 * refresh queue and token state for the lifetime of the page session.
 */
export const baseClient = createBaseClient("v1");
export const authClient = createAuthClient("v1");
