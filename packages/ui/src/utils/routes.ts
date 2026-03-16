const API_BASE = "api/v1";

export const ROUTES = {
  auth: {
    base: `${API_BASE}/auth`,
    login: `${API_BASE}/auth/login`,
    register: `${API_BASE}/auth/register`,
    refresh: `${API_BASE}/auth/refresh`,
    logout: `${API_BASE}/auth/logout`,
  },
} as const;
