import { Router } from "express";
import { authenticate } from "src/middleware/authenticate.middleware.js";
import { profileController } from "./profile.controller.js";

const profileRoute = Router();

profileRoute.get(
  "/upload-signature",
  authenticate,
  profileController.getUploadSignature,
);
profileRoute.patch(
  "/update-user",
  authenticate,
  profileController.updateProfile,
);

export default profileRoute;
