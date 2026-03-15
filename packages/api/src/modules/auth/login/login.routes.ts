import { Router } from "express";
import { loginController } from "./login.controller.js";
import { validate } from "src/middleware/validate.middleware.js";
import { loginFormSchema } from "@sphere/shared";

const router = Router();

router.post("/login", validate(loginFormSchema), loginController.login);

export default router;
