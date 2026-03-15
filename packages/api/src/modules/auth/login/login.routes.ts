import { Router } from "express";
import { loginController } from "./login.controller.js";
import { validate } from "src/middleware/validate.middleware.js";
import { loginBodySchema } from "./login.schema.js";

const router = Router();

router.post("/login", validate(loginBodySchema), loginController.login);

export default router;
