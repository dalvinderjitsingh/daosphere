import { z } from "zod";
import { ethers } from "ethers";

export const walletSchema = z.object({
  walletAddress: z
    .string()
    .refine(async (value) => ethers.utils.isAddress(value), {
      message: "Invalid wallet address",
    }),
});
