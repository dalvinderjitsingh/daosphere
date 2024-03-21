import { NextResponse } from "next/server";
import { Database } from "@tableland/sdk";
import { Wallet, getDefaultProvider } from "ethers";

export async function GET() {
  //   const provider = getDefaultProvider(
  //     "https://api.calibration.node.glif.io/rpc/v1",
  //   );
  const wallet = new Wallet(process.env.PRIVATE_KEY);

  //   const signer = wallet.connect(provider);
  console.log(process.env.PRIVATE_KEY); // Make sure to remove or comment out this line in production
  //   return new Response(
  //     "Environment variable accessed. Private-Key: " + wallet,
  //     { status: 200 },
  //   );
  return NextResponse.json(wallet);
}

// import { NextResponse } from "next/server";
// import { Database } from "@tableland/sdk";
// import { Wallet, getDefaultProvider } from "ethers";
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
// interface UserTableSchema {
//   id: number;
//   name: string;
//   username: string;
//   wallet_address: string;
// }

// export async function GET() {
//   try {
//     const provider = getDefaultProvider(
//       "https://api.calibration.node.glif.io/rpc/v1",
//     );
//     const wallet = new Wallet(process.env.PRIVATE_KEY, provider);

//     const signer = wallet.connect(provider);
//     const db = new Database<UserTableSchema>({ signer });
//     console.log(db);
//     const { results } = await db
//       .prepare(
//         `SELECT * FROM ${userTableName} Where wallet_address = ? LIMIT 1;`,
//       )
//       .bind("0x83946EaC3117ad58a1ac5D0E4fB967DC0e24c166")
//       .all<UserTableSchema>();
//     if (results.length === 0) {
//       return NextResponse.json({ message: "User not found" });
//     }
//     return NextResponse.json(results[0]);
//   } catch (err: any) {
//     console.error(err.message);
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }
