import { z } from "zod";

export const registerSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address").endsWith("@gmail.com", "Only Gmail allowed"),
  password: z.string()
    .min(8, "Password must be 8+ characters")
    .regex(/[A-Z]/, "Must contain one uppercase letter")
    .regex(/[0-9]/, "Must contain one number")
    .regex(/[^a-zA-Z0-9]/, "Must contain one special character"),
});