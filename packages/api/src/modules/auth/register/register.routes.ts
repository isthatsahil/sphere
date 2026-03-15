import { Router } from "express";
import { validate } from "src/middleware/validate.middleware.js";
import { registerBodySchema } from "@sphere/shared";
import { registerController } from "../register/register.controller.js";

const router = Router();

router.post(
  "/register",
  validate(registerBodySchema),
  registerController.register,
);

export default router;
