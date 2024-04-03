import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const result = await sql`
      CREATE TABLE IF NOT EXISTS Users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        username VARCHAR(255) UNIQUE NOT NULL,
        wallet_address VARCHAR(255) UNIQUE NOT NULL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

// api to delete users table
// export async function DELETE(request: Request) {
//  try {
//     const result = await sql`DROP TABLE IF EXISTS users;`;
//     return NextResponse.json({ message: "Table 'Users' deleted successfully" }, { status: 200 });
//  } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//  }
// }
