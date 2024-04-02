import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const users = await sql`SELECT * FROM Users;`;
    return NextResponse.json({ users }, { status: 200 });
    //return NextResponse.json({ pets: pets.rows }, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching users." },
      { status: 500 },
    );
  }
}

// http://localhost:3000/api/query-users-table
