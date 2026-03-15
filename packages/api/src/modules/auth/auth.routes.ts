import { Router } from "express";
import registerRouter from "./register/register.routes.js";
import loginRouter from "./login/login.routes.js";
import refreshRouter from "./refresh/refresh.routes.js";
import logoutRouter from "./logout/logout.routes.js";
import meRouter from "./me/me.routes.js";

const authRouter = Router();

authRouter.use(registerRouter);
authRouter.use(loginRouter);
authRouter.use(refreshRouter);
authRouter.use(logoutRouter);
authRouter.use(meRouter);

export default authRouter;
