"use client";

console.log(
  "MAIN THING BRO, THE SCHEMA CAN ONLY HAVE THINGS THAT THERE WILL BE INPUT FOR SO WALLET ADDRESS WILL NOT BE IN SCHEMA",
);

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formUserSchema } from "@/lib/validators/formUserSchema";
import { userSchema } from "@/lib/validators/userSchema";
import { walletSchema } from "@/lib/validators/walletSchema";
import { useAccount } from "wagmi";
import ethers from "ethers";
import { sql } from "@vercel/postgres";
import { NextResponse, NextRequest } from "next/server";
import { addNewUser, checkUsernameAvailability } from "@/lib/db/utils";

export default function UserSignUpForm() {
  const { isConnected, address, isConnecting } = useAccount();

  // 1. Define your form.
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      username: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof userSchema>) {
    console.log("submitting");
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);

    if (isConnected && address !== undefined) {
      // Perform client-side validation with Zod
      const validatedData = userSchema.parse({
        name: values.name,
        username: values.username,
      });
      const { name, username } = validatedData;
      console.log("name, username: " + name + " " + username);

      // const validatedWallet = walletSchema.parse({
      //   walletAddress: address,
      // });
      // const { walletAddress } = validatedWallet;
      // console.log("walletAddress: " + walletAddress);

      let walletAddress = "";

      try {
        const validatedWallet = await walletSchema.parseAsync({
          walletAddress: address,
        });
        // Assign the validated wallet address to the variable declared outside the try block
        walletAddress = validatedWallet.walletAddress;
        console.log("Validated wallet address:", walletAddress);
        // Proceed with the rest of your form submission logic
      } catch (error) {
        console.error("Validation error:", error);
        // Handle the validation error, e.g., show an error message to the user
      }

      // // commenting out here till......
      // // Check if the username already exists in the database
      // if (!checkUsernameAvailability(username)) {
      //   // Username already exists, return an error response
      //   // setError("username", {
      //   //   type: "manual",
      //   //   message: "Username already exists",
      //   // });
      //   console.log(username + " already exists");
      //   return; // Prevent form submission
      // }

      console.log("error check 1");

      // if wallet schema works then this can be deleted
      // // Check if the wallet address is valid
      // if (!ethers.utils.isAddress(wallet_address)) {
      //   // Invalid wallet address, return an error response
      //   console.log("error with wallet address");
      //   return;
      // }
      console.log("error check 2");

      const result = await addNewUser(name, username, walletAddress);

      if (result) {
        console.log("user created on postgres!! Yahooooo!!!!! Cool!!!!");
      } else {
        console.log("error creating user on postgres");
      }
    }

    console.log("error check 3");

    // AFTER the above i should iether show an idicator as to what happened meaning it was a success or not or redirect to home page
    // and wait for the confirmation in the background and either choose to show or now, also might need to save form input into state and pass it to homepage
  }

  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Dwight Shrute" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="dwightshrute" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display username.
                </FormDescription>
                <FormMessage className="text-wrap" />
              </FormItem>
            )}
          />
          <Button type="submit" className="min-w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
