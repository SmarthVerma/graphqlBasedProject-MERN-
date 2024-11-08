import * as z from "zod";

const LoginSchema = z.object({
  username: z.string().nonempty("Username is required"), // Ensures the username is not empty
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long") // Minimum password length
    .nonempty("Password is required"), // Ensures the password is not empty
});

export default LoginSchema;
