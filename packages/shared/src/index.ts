export {
  loginFormSchema,
  loginBodySchema,
  registerFormSchema,
  registerBodySchema,
} from "./schemas/auth";

// Core user shape — mirrors the Drizzle schema in packages/api/src/db/schema.ts
export interface User {
  id: number;
  email: string;
  username: string;
  firstName: string | null;
  lastName: string | null;
  passwordHash: string;
  avatar: string | null;
  bio: string | null;
  createdAt: Date;
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
