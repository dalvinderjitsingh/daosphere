// query users table based on a wallet address

// http://localhost:3000/api/query-pets-table

import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // Extract the wallet address from the request query parameters
  const url = new URL(request.url);
  const walletAddress = url.searchParams.get("walletAddress");

  if (!walletAddress) {
    return new NextResponse("Wallet address is required", { status: 400 });
  }

  // Query the user table based on the wallet address
  const user =
    await sql`SELECT * FROM Users WHERE wallet_address = ${walletAddress};`;

  // Check if the user exists
  if (user.rows.length > 0) {
    // User exists, return the user data
    return NextResponse.json({ user: user.rows[0] }, { status: 200 });
  } else {
    // User does not exist, return an appropriate response
    return new NextResponse("User not found", { status: 404 });
  }
}
