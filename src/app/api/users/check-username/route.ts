import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // Extract the username from the request query parameters
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json({ error: "Username required" }, { status: 400 });
  }

  try {
    // Query the user table based on the username
    const user = await sql`SELECT * FROM Users WHERE username = ${username};`;

    // Check if the user exists
    if (user.rows.length > 0) {
      // Username exists
      return NextResponse.json({ message: "Username exists" }, { status: 200 });
    } else {
      // Username does not exist
      return NextResponse.json(
        { message: "Username does not exist" },
        { status: 409 },
      );
    }
  } catch (error) {
    // Log the detailed error for debugging
    console.error("Error checking username existance:", error);
    // Return a generic error response to the client
    return NextResponse.json(
      { error: "An error occurred while checking username existance." },
      { status: 500 },
    );
  }
}
