import { sql } from "@vercel/postgres";
import { NextResponse, NextRequest } from "next/server";
import { z } from "zod";
import { userSchema } from "@/lib/validators/userSchema";
import { ethers } from "ethers";

export async function POST(request: NextRequest) {
  console.log("error check 1");
  try {
    // Attempt to parse and validate the request body using Zod
    const body = await request.json();
    console.log("Raw request body:", request.body);
    console.log("error check 2");

    const validatedData = userSchema.parse(body);
    console.log("error check 3");

    // Extract the wallet address from the request body
    const { wallet_address } = body;

    // Extract the validated data
    const { name, username } = validatedData;
    console.log("error check 4");

    // Check if the username already exists in the database
    const existingUser =
      await sql`SELECT * FROM Users WHERE username = ${username};`;
    if (existingUser.rows.length > 0) {
      // Username already exists, return an error response
      return NextResponse.json(
        { error: "Username already exists" },
        { status: 409 },
      );
    }
    console.log("error check 5");

    // Check if the wallet address is valid
    if (!ethers.utils.isAddress(wallet_address)) {
      // Invalid wallet address, return an error response
      return NextResponse.json(
        { error: "Invalid wallet address" },
        { status: 400 },
      );
    }
    console.log("error check 6");

    // Execute the SQL query with the validated data
    await sql`
        INSERT INTO Users (name, username, wallet_address)
        VALUES (${name}, ${username}, ${wallet_address});
     `;

    // Return a success response after successfully inserting the user
    return NextResponse.json(
      { message: "User added successfully" },
      { status: 201 },
    );
    // } catch (error) {
    //   return NextResponse.json({ error }, { status: 500 });
    //   // console.error("Error adding user:", error);
    //   // return NextResponse.json({ error: error.message }, { status: 500 });
    // }
  } catch (error) {
    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      // Return a custom error response with the validation errors
      console.log(error.message);
      console.error("Zod validation error:", error.errors);
      return NextResponse.json({ error: error.errors }, { status: 400 });
    } else {
      // Handle other types of errors
      return NextResponse.json(
        { error: "An error occurred while adding the user." },
        { status: 500 },
      );
    }
  }
}

// {
//   name: "Michael Scott",
//   username: "mscott",
//   wallet_address: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045"
// }
