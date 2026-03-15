import { registerFormSchema, registerBodySchema } from "@sphere/shared";
import type { z } from "zod";

export { registerBodySchema };

export type RegisterInput = z.infer<typeof registerFormSchema>;
