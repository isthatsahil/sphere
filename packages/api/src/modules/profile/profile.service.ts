import path from "path";
import { cloudinary } from "src/config/cloudinary.js";
import { logger } from "src/config/logger.js";
import type { IUpdateUserPayload } from "src/types/profile.js";
import { CLOUDINARY_CONST } from "src/utils/consts.js";
import { ValidationError } from "src/utils/errors.js";
import { profileRepository } from "./profile.repository.js";

export const profileService = {
  getUploadSignature: (userId: number | undefined) => {
    const log = logger.child(path.basename(import.meta.url, ".js"));
    log.info(`Initiating getUploadSignature() method`);
    if (!userId) throw new ValidationError("User ID is required");

    const timestamp = Math.round(Date.now() / 1000);
    const paramsToSign = {
      eager: CLOUDINARY_CONST.AVATAR_EAGER,
      folder: CLOUDINARY_CONST.UPLOAD_FOLDER,
      timestamp,
    };
    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET!,
    );

    log.info("Generated Cloudinary upload signature successfully");

    return {
      signature,
      timestamp,
      apiKey: cloudinary.config().api_key,
      cloudName: cloudinary.config().cloud_name,
      folder: CLOUDINARY_CONST.UPLOAD_FOLDER,
      eager: CLOUDINARY_CONST.AVATAR_EAGER,
    };
  },

  updateProfile: async (
    userId: number | undefined,
    payload: IUpdateUserPayload,
  ) => {
    const log = logger.child(path.basename(import.meta.url, ".js"));
    log.info(`Initiating updateProfile() method`);

    if (!userId) throw new ValidationError("User ID is required");

    log.info("Updating user profile");
    return profileRepository.updateProfile(userId, payload);
  },
};
