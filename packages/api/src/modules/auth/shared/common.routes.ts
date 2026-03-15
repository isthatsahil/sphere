import { Router } from "express";
import { validate } from "src/middleware/validate.middleware.js";
import { loginFormSchema, registerBodySchema } from "@sphere/shared";
import { registerController } from "../register/register.controller.js";
import { loginController } from "../login/login.controller.js";
import { refreshController } from "../refresh/refresh.controller.js";

const router = Router();

router.post(
  "/register",
  validate(registerBodySchema),
  registerController.register,
);

router.post("/login", validate(loginFormSchema), loginController.login);

router.post("/refresh", refreshController.refresh);

export default router;
