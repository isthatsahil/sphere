import { Router } from "express";
import { validate } from "src/middleware/validate.middleware.js";
import { registerController } from "../register/register.controller.js";
import { registerBodySchema } from "./register.schema.js";
const router = Router();

router.post(
  "/register",
  validate(registerBodySchema),
  registerController.register,
);

export default router;
