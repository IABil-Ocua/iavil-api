import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(1, "Name is required."),
  email: z.string().min(1, "Email is required.").email("Invalid email format."),
  username: z.string().min(3, "The username is required"),
  avatar: z.string().optional(),
  cover: z.string().optional(),
  birthDate: z.coerce.date(),
  password: z.string().min(6, "Password must be at least 6 characters long."),
  avatarUrl: z.string().url("Invalid URL format").optional(),
  role: z
    .enum(["SUPER_ADMIN", "ADMIN", "STUDENT", "GRADUETE"])
    .refine(
      (val) => ["SUPER_ADMIN", "ADMIN", "STUDENT", "GRADUETE"].includes(val),
      {
        message: "Role must be one of the predefined values.",
      }
    ),
});

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required.").email("Invalid email format"),
  password: z.string().min(1, "Password is required."),
});
