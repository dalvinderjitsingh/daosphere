"use client";

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

import { userSchema } from "@/lib/validators/userSchema";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
import { addNewUser, checkUsernameExists } from "@/lib/db/utils";
import { useRouter } from "next/navigation";

export default function UserSignUpForm() {
  const { isConnected, address, isConnecting } = useAccount();
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      username: "",
    },
  });

  // Access form methods and properties using the form variable
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    trigger,
  } = form;

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof userSchema>) {
    console.log("submitting");
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);

    try {
      if (isConnected && address !== undefined) {
        // Perform client-side validation with Zod
        const validatedData = await userSchema.parse({
          name: values.name,
          username: values.username,
        });
        const { name, username } = validatedData;
        console.log("Validated name, username: " + name + " " + username);

        // // Check if the username already exists in the database
        const usernameExist = await checkUsernameExists(username);
        if (usernameExist === true) {
          // Username already exists, return an error responses
          setError("username", {
            type: "manual",
            message: "Username already exists",
          });
          console.log("Error: Username '" + username + "' already exists");
          return; // Prevent form submission
        }

        const result = await addNewUser(name, username, address);
        if (result) {
          console.log("Sucess: User created on postgres");
          // wait 5 second then route to dashboard
          setTimeout(() => {
            router.push("/dashboard");
          }, 2000);
        } else {
          console.log("Error creating user on postgres");
        }
      }

      // Further logic...
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle zod errors
        console.error("Validation error:", error.errors);
      } else {
        // Handle other errors
        // Handle the error, e.g., show an error message to the user
        console.error("Error during form submission:", error);
      }
    }
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
