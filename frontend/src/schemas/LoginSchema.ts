// schemas/LoginSchema.ts
import * as z from "zod";

const LoginSchema = z.object({
  email: z
    .string()
    .email("Invalid email address") // Ensures the email is valid
    .nonempty("Email is required"), // Ensures the email is not empty
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long") // Minimum password length
    .nonempty("Password is required"), // Ensures the password is not empty
});

export default LoginSchema;
