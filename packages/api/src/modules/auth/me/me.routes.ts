import { Router } from "express";
import { meController } from "./me.controller.js";
import { authenticate } from "src/middleware/authenticate.middleware.js";

const router = Router();

router.get("/me", authenticate, meController.getMe);

export default router;
