import type { TokenPayload } from "./tokens.js";

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}
