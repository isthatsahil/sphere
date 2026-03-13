export { loginFormSchema, registerFormSchema } from './schemas/auth';

// Core user shape — mirrors the Drizzle schema in packages/api/src/db/schema.ts
export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string; // ISO 8601 string (dates serialize to strings over JSON)
}

export interface CreateUserInput {
  name: string;
  email: string;
}

// Generic API envelope used by Express handlers and consumed by the UI
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface ApiErrorResponse {
  message: string;
  code?: string;
}

// Pagination wrapper for list endpoints
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}
