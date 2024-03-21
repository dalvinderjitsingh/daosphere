import { NextResponse } from "next/server";
import { Database } from "@tableland/sdk";
import { Wallet, getDefaultProvider } from "ethers";
// import * as dotenv from "dotenv";
// dotenv.config();
// import {} from "dotenv/config";

// Load the private key from the environment variable
// const PRIVATE_KEY =
//   process.env.PRIVATE_KEY !== undefined ? process.env.PRIVATE_KEY : "fuck";
// if (!PRIVATE_KEY || PRIVATE_KEY === "fuck") {
//   throw new Error("PRIVATE_KEY environment variable is not set");
// }

// FINALEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
// const wallet = new Wallet(process.env.PRIVATE_KEY);
// const provider = getDefaultProvider(
//   "https://api.calibration.node.glif.io/rpc/v1",
// );
// const signer = wallet.connect(provider);

// const PRIVATE_KEY =
//   process.env.NEXT_PUBLIC_PRIVATE_KEY !== undefined
//     ? process.env.NEXT_PUBLIC_PRIVATE_KEY
//     : "fuck";
// const RPC_URL = "https://rpc.ankr.com/filecoin_testnet";

// let provider: any, signer: any, wallet: any;
// // // let provider: Provider | undefined, signer: Signer | undefined, wallet: Wallet | undefined;

// async function initializeEthers() {
//   try {
//     provider = getDefaultProvider(RPC_URL);
//     wallet = new Wallet(PRIVATE_KEY);
//     signer = wallet.connect(provider);
//   } catch (error) {
//     console.error("Error initializing Ethers:", error);
//     throw error;
//   }
// }

// initializeEthers();

// const db = new Database<UserTableSchema>({ signer });

// User table name, last 3 digits are token id
const userTableName = "user_test1_314159_720";

// Interface for the user table's schema
interface UserTableSchema {
  id: number;
  name: string;
  username: string;
  wallet_address: string;
}

export async function POST(request: Request) {
  const { name, username, walletAddress } = await request.json();

  try {
    const wallet = new Wallet(process.env.PRIVATE_KEY);
    const provider = getDefaultProvider(
      "https://api.calibration.node.glif.io/rpc/v1",
    );
    const signer = wallet.connect(provider);
    const db = new Database<UserTableSchema>({ signer });
    // Check if provider and signer are initialized
    if (!provider || !signer || !db) {
      console.log("Ethers provider and signer and or db not initialized");
      throw new Error("Ethers provider and signer and or db not initialized");
    }

    const { meta: write } = await db
      .prepare(
        `INSERT INTO ${userTableName} (name, user_name, wallet_address) VALUES (?, ?, ?);`,
      )
      .bind(name, username, walletAddress)
      .run();
    await write.txn?.wait();
    return NextResponse.json({
      message: `Successfully wrote data to table '${userTableName}'`,
    });
  } catch (err: any) {
    console.error("Error writing to Tableland:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const walletAddress = searchParams.get("walletAddress");

  if (!walletAddress) {
    return NextResponse.json(
      { error: "walletAddress query parameter is required" },
      { status: 400 },
    );
  }

  try {
    const wallet = new Wallet(process.env.PRIVATE_KEY);
    const provider = getDefaultProvider(
      "https://api.calibration.node.glif.io/rpc/v1",
    );
    const signer = wallet.connect(provider);
    const db = new Database<UserTableSchema>({ signer });
    const { results } = await db
      .prepare(
        `SELECT * FROM ${userTableName} Where wallet_address = ? LIMIT 1;`,
      )
      .bind(walletAddress)
      .all<UserTableSchema>();
    if (results.length === 0) {
      return NextResponse.json({ message: "User not found" });
    }
    return NextResponse.json(results[0]);
  } catch (err: any) {
    console.error(err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
