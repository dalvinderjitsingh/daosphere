import { z } from "zod";

export const userSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(30, "Name cannot be longer than 30 characters"),
  username: z
    .string()
    .min(4, "Username must be at least 4 characters long")
    .max(15, "Username cannot be longer than 15 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain alphanumeric characters and underscores",
    ),
  // wallet_address: z.string(),
});
