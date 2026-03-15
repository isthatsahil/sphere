import { z } from "zod";

// Accepts either a valid email OR a username (3-20 alphanumeric/underscore chars)
const emailOrUsername = z.union(
  [
    z.email({ message: "Enter a valid email or username" }),
    z
      .string()
      .min(5, { message: "Username must be at least 5 characters" })
      .max(20, { message: "Username must be at most 20 characters" })
      .regex(/^[a-zA-Z0-9_]+$/, {
        message: "Username can only contain letters, numbers, and underscores",
      }),
  ],
  { error: "Enter a valid email or username" },
);

export const loginFormSchema = z.object({
  identifier: emailOrUsername,
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export const registerFormSchema = z.object({
  email: z.email({ message: "Enter a valid email" }),
  username: z
    .string()
    .min(5, { message: "Username must be at least 5 characters" })
    .max(20, { message: "Username must be at most 20 characters" })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username can only contain letters, numbers, and underscores",
    }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export const registerBodySchema = z.object({ body: registerFormSchema });
export const loginBodySchema = z.object({ body: loginFormSchema });
