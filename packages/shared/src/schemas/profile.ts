import { z } from "zod";

export const profileFormSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  bio: z.string().max(300).optional(),
  avatar: z.url().optional(),
});
export const profileBodySchema = z.object({ body: profileFormSchema });
