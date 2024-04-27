import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  // Extract the user ID from the request URL
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("id");

  if (!userId) {
    return NextResponse.json({ error: "User ID required" }, { status: 400 });
  }

  try {
    // Attempt to delete the user from the database
    await sql`DELETE FROM Users WHERE id = ${userId};`;

    // Return a success response
    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    // Log the detailed error for debugging
    console.error("Error deleting user:", error);
    // Return a generic error response to the client
    return NextResponse.json(
      { error: "An error occurred while deleting the user." },
      { status: 500 },
    );
  }
}
