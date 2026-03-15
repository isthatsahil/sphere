import { registerFormSchema, loginFormSchema } from "@sphere/shared";
import type { z } from "zod";

export { registerFormSchema, loginFormSchema };

export type RegisterInput = z.infer<typeof registerFormSchema>;
export type LoginInput = z.infer<typeof loginFormSchema>;
