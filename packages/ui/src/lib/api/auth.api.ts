import { authClient, baseClient } from "@/lib/http";
import type { ApiResponse, User } from "@sphere/shared";
import { API_ROUTES } from "@/utils/constant";

export interface LoginPayload {
  identifier: string;
  password: string;
}
export interface RegisterPayload {
  email: string;
  username: string;
  password: string;
}
export interface AuthSuccessResponse {
  accessToken: string;
  user: User;
}

export async function loginApi(
  payload: LoginPayload,
): Promise<AuthSuccessResponse> {
  const { data } = await authClient.post<ApiResponse<AuthSuccessResponse>>(
    API_ROUTES.auth.login,
    payload,
  );
  return data.data;
}

export async function registerApi(
  payload: RegisterPayload,
): Promise<AuthSuccessResponse> {
  const { data } = await authClient.post<ApiResponse<AuthSuccessResponse>>(
    API_ROUTES.auth.register,
    payload,
  );
  return data.data;
}

export async function logoutApi(): Promise<void> {
  await baseClient.post(API_ROUTES.auth.logout);
}

export async function refreshApi(): Promise<string> {
  const { data } = await authClient.post<ApiResponse<{ accessToken: string }>>(
    API_ROUTES.auth.refresh,
  );
  return data.data.accessToken;
}
