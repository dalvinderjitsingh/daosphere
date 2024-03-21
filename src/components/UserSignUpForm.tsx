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
// import { writeUserTable, deleteUser } from "@/lib/tablelandUtils";
// import { writeUserTable } from '@/app/api/tableland/userTable/route';
import { useAccount } from "wagmi";

const userFormSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  username: z.string().min(3, {
    message: "Username must be at least 2 characters.",
  }),
});

export default function UserSignUpForm() {
  const { isConnected, address, isConnecting } = useAccount();

  // 1. Define your form.
  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: "",
      username: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof userFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);

    // here i need to submit it to tableand
    // if (isConnected && address !== undefined) {
    //   await writeUserTable(values.name, values.username, address);
    //   console.log("user created on tableland");
    // }

    // if (isConnected && address !== undefined) {
    //   await deleteUser();
    //   console.log("user deleted from tableland");
    // }

    // API style:

    if (isConnected && address !== undefined) {
      const name = values.name;
      const username = values.username;
      const walletAddress = address;

      console.log(name, username, walletAddress);

      try {
        const response = await fetch("/api/tableland/userTable", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, username, walletAddress }),
        });

        const data = await response.json();
        if (response.ok) {
          console.log(data.message);
          // Reset form fields or show a success message
        } else {
          console.error("first error: " + data.error);
          // Show an error message
        }
      } catch (error) {
        console.error("second error: " + error);
        // Show an error message
      }
    }

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
                <FormMessage />
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
