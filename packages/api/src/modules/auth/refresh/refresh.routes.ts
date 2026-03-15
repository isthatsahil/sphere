import { Router } from "express";
import { refreshController } from "./refresh.controller.js";

const router = Router();

router.post("/refresh", refreshController.refresh);

export default router;
