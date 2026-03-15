import { Router } from "express";
import type { Request, Response } from "express";
import { createRequire } from "module";
import authRouter from "src/modules/auth/common/common.routes.js";

const require = createRequire(import.meta.url);
const { version } = require("../../../package.json") as { version: string };

const v1Router = Router();

v1Router.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "ok", version, apiVersion: "v1" });
});

v1Router.use("/auth", authRouter);

export default v1Router;
