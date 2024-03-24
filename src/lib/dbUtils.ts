"use server";

import { Database } from "@tableland/sdk";
import { Wallet, getDefaultProvider } from "ethers";

import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const users = await sql`SELECT * FROM Users;`;
  return NextResponse.json({ users }, { status: 200 });
  //return NextResponse.json({ pets: pets.rows }, { status: 200 });
}


interface UserTableSchema {
    id: number;
    name: string;
    username: string;
    wallet_address: string;
  }

export async function getUserByWalletAddress(
    walletAddress: string,
  ): Promise<UserTableSchema | null> {
    try {
      // const db = new Database<UserTableSchema>({ signer });
      const { results } = await db
        .prepare(
          `SELECT * FROM ${userTableName} Where wallet_address = ? LIMIT 1;`,
        )
        .bind(walletAddress)
        .all<UserTableSchema>();
      console.log(`Read data from table '${userTableName}':`);
      console.log(results[0]);
      console.log(results);
      console.log(results[0].wallet_address);
      return results[0] || null;
    } catch (err: any) {
      console.error(err.message);
      return null;
    }
  }