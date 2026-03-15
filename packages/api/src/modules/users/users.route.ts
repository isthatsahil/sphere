import { Router } from "express";
import { userController } from "./users.controller.js";
import { validate } from "src/middleware/validate.middleware.js";
import { registerBodySchema } from "@sphere/shared";

const router = Router();

router.post("/register", validate(registerBodySchema), userController.register);

export default router;
