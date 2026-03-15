import { Router } from "express";
import { registerController } from "./register.controller.js";
import { validate } from "src/middleware/validate.middleware.js";
import { registerBodySchema } from "@sphere/shared";

const router = Router();

router.post(
  "/register",
  validate(registerBodySchema),
  registerController.register,
);

export default router;
