import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // Extract the wallet address from the request query parameters
  const { searchParams } = new URL(request.url);
  const walletAddress = searchParams.get("walletAddress");

  try {
    if (!walletAddress) throw new Error("Wallet address required");

    // Query the user table based on the wallet address
    const user =
      await sql`SELECT * FROM Users WHERE wallet_address = ${walletAddress};`;

    // Check if the user exists
    if (user.rows.length > 0) {
      // wallet address exists, return the user data
      return NextResponse.json({ user: user.rows[0] }, { status: 200 });
    } else {
      // wallet addresss does not exist, return an appropriate response
      return new NextResponse("Wallet address not found", { status: 404 });
    }
  } catch (error) {
    // return NextResponse.json({ error }, { status: 500 });
    // Log the detailed error for debugging
    console.error("Error fetching user:", error);
    // Return a generic error response to the client
    return NextResponse.json(
      { error: "An error occurred while fetching the user." },
      { status: 500 },
    );
  }
}
