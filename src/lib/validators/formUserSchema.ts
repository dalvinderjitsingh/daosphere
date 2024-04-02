import { z } from "zod";
import { ethers } from "ethers";
import { checkUsernameAvailability } from "../db/utils";

export const formUserSchema = z.object({
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
    )
    .refine(
      async (username) => {
        // Make an API call to check if the username already exists in the database
        // If the username does exist return false
        const isAvailable = await checkUsernameAvailability(username);
        return isAvailable;
      },
      {
        message: "Username already exists",
      },
    ),
  // .unique(), // Assuming you have a method to check uniqueness, e.g., in your database
  wallet_address: z
    .string()
    .refine(async (value) => ethers.utils.isAddress(value), {
      message: "Invalid wallet address",
    }),
  // Add other fields as necessary
});
