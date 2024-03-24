import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

interface FormData {
  name: string;
  username: string;
  wallet_address: string;
}

export async function POST(formData: FormData) {
  const { name, username, wallet_address } = formData;

  try {
    if (!name || !username || !wallet_address) {
      throw new Error("Name, username, and wallet address are required");
    }
    await sql`
      INSERT INTO Users (name, username, wallet_address)
      VALUES (${name}, ${username}, ${wallet_address});
   `;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  //   const users = await sql`SELECT * FROM Users;`;
  //   return NextResponse.json({ users }, { status: 200 });
}
