import { Router } from "express";
import { logoutController } from "./logout.controller.js";
import { authenticate } from "src/middleware/authenticate.middleware.js";

const router = Router();

router.post("/logout", authenticate, logoutController.logout);

export default router;
