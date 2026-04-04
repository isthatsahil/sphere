import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "@sphere/shared";
import {
  getUploadSignatureApi,
  uploadToCloudinary,
  updateProfileApi,
  type UpdateProfilePayload,
} from "@/lib/api/profile.api";
import { useAuthStore } from "@/stores/authStore";
import type { ICloudinaryUploadResponse } from "@/types/cloudinary";

interface IuseUpdateProfileInput extends Omit<UpdateProfilePayload, "avatar"> {
  avatarFile?: File | null;
}
export function useUpdateProfile() {
  const { setUser } = useAuthStore();

  return useMutation({
    mutationFn: async ({ avatarFile, ...fields }: IuseUpdateProfileInput) => {
      let uploadResponse: ICloudinaryUploadResponse | Error;
      let avatarUrl: string | undefined;
      if (avatarFile) {
        const sig = await getUploadSignatureApi();
        uploadResponse = await uploadToCloudinary(avatarFile, sig);

        if (uploadResponse instanceof Error) throw uploadResponse;
        avatarUrl = uploadResponse.secure_url;
      }

      return updateProfileApi({ ...fields, avatar: avatarUrl });
    },
    onSuccess({ user }) {
      console.log(`NEW USER ${JSON.stringify(user)}`);
      setUser(user);
      toast.success("Profile updated successfully!");
    },

    onError(error: AxiosError<ApiErrorResponse>) {
      const message =
        error.response?.data?.message ||
        "Failed to update profile. Please try again.";
      toast.error(message);
    },
  });
}
