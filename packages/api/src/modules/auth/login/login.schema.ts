import { loginFormSchema, loginBodySchema } from "@sphere/shared";
import type { z } from "zod";

export { loginFormSchema, loginBodySchema };

export type LoginInput = z.infer<typeof loginFormSchema>;
