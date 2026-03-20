export const API_ROUTES = {
  base: `/api`,
  auth: {
    base: `/auth`,
    login: `/auth/login`,
    register: `/auth/register`,
    refresh: `/auth/refresh`,
    logout: `/auth/logout`,
  },
} as const;

export const LOGIN_ROUTES = {
  login: `/login`,
  register: `/register`,
} as const;
