import { baseClient } from "@/lib/http";
import type { ApiResponse, User } from "@sphere/shared";
import { API_ROUTES } from "@/utils/constant";
import type { ICloudinaryUploadResponse } from "@/types/cloudinary";

export interface UploadSignatureResponse {
  signature: string;
  timestamp: number;
  apiKey: string;
  cloudName: string;
  folder: string;
  eager: string;
}

export interface UpdateProfilePayload {
  firstName?: string;
  lastName?: string;
  bio?: string;
  avatar?: string; // Cloudinary secure_url (set after upload)
}

export interface IUpdateProfileSuccessResponse {
  user: User;
}

export async function getUploadSignatureApi(): Promise<UploadSignatureResponse> {
  const { data } = await baseClient.get<ApiResponse<UploadSignatureResponse>>(
    API_ROUTES.profile.uploadSignature,
  );
  return data.data;
}

export async function uploadToCloudinary(
  file: File,
  sig: UploadSignatureResponse,
): Promise<ICloudinaryUploadResponse | Error> {
  const form = new FormData();
  form.append("file", file);
  form.append("api_key", sig.apiKey);
  form.append("timestamp", String(sig.timestamp));
  form.append("signature", sig.signature);
  form.append("folder", sig.folder);
  form.append("eager", sig.eager);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${sig.cloudName}/image/upload`,
    { method: "POST", body: form },
  );
  if (!res.ok) throw new Error("Cloudinary upload failed");
  const json = await res.json();
  return {
    ...json,
    // Prefer the eagerly-transformed variant (400×400 WebP) over the raw original
    secure_url: json.eager?.[0]?.secure_url ?? json.secure_url,
  };
}

export async function updateProfileApi(
  payload: UpdateProfilePayload,
): Promise<IUpdateProfileSuccessResponse> {
  const { data } = await baseClient.patch<
    ApiResponse<IUpdateProfileSuccessResponse>
  >(
    API_ROUTES.profile.update,
    payload, // plain JSON — no FormData, no multer
  );
  return data.data;
}
