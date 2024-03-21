"use server";

import { Database } from "@tableland/sdk";
import { Wallet, getDefaultProvider } from "ethers";
// import * as dotenv from "dotenv";
// dotenv.config();
// import {} from "dotenv/config";

// function setupWallet() {
//   if (process.env.PRIVATE_KEY !== undefined) {
//     console.log("Wallet set up " + process.env.PRIVATE_KEY);
//     return new Wallet(process.env.PRIVATE_KEY);
//   }
// }

// const wallet = setupWallet();

// async function apiwallet() {
//   try {
//     const response = await fetch("/api", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     const data = await response.json();
//     if (response.ok) {
//       console.log(data.message);
//       return data;
//       // Reset form fields or show a success message
//     } else {
//       console.error("first error: " + data.error);
//       // Show an error message
//     }
//   } catch (error) {
//     console.error("second error: " + error);
//     // Show an error message
//   }
// }

// const wallet = apiwallet();

const wallet = new Wallet(
  process.env.PRIVATE_KEY !== undefined ? process.env.PRIVATE_KEY : "fuck",
);

const provider = getDefaultProvider("https://rpc.ankr.com/filecoin_testnet");

const signer = wallet.connect(provider);

// function setupSigner() {
//   if (wallet !== undefined) {
//     console.log("Signer set up " + wallet.address);
//     return wallet.connect(provider);
//   }
// }

// const signer = setupSigner();

const db = new Database<UserTableSchema>({ signer });

// User table name, last 3 digits are token id
const userTableName = "user_test1_314159_720";
// DataDao table name
const dataDaoTableName = "";
// User_DataDao table name
const user_dataDaoTableName = "";

// Interface for the user table's schema
interface UserTableSchema {
  id: number;
  name: string;
  username: string;
  wallet_address: string;
}

// Interface for the dataDao table's schema
interface DataDaoTableSchema {
  id: number;
  name: string;
  contract_address: string;
}

// Interface for the user_dataDao table's schema
interface User_DataDaoTableSchema {
  id: number;
  userID: string;
  dataDaoID: string;
}

// Create a table with hardcoded prefix and schema
// async function createTable() {
//     // The table's `name` is in the format `{prefix}_{chainId}_{tableId}`
//     const userTableName = create.txn?.names[0] ?? ""; // e.g., my_table_31337_2
//     const tableID = create.txn?.tableIds[0] ?? ""; // e.g., 2
//     const { name: userTableName2 } = create.txn!;
//     console.log(`Created table ${userTableName}. Created table ID ${tableID}`);
//     console.log(
//       `test: ${create.txn?.names}, ${create.txn?.tableIds}, ${userTableName2}`,
//   }
// }

// Write data to the user table from the sign up form input
export async function writeUserTable(
  name: string,
  username: string,
  wallet_address: string,
) {
  console.log("writeUserTable activated");
  try {
    // const db = new Database<UserTableSchema>({ signer });

    const { meta: write } = await db
      .prepare(
        `INSERT INTO ${userTableName} (name, user_name, wallet_address) VALUES (?, ?, ?);`,
      )
      .bind(name, username, wallet_address)
      .run();
    await write.txn?.wait();
    console.log(`Successfully wrote data to table '${userTableName}'`);
  } catch (err: any) {
    console.error(err.message);
  }
}

// READ USER TABLE DATA
// Find user by wallet address
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

// deleta minerva
export async function deleteUser() {
  try {
    const { meta: deleteOperation } = await db
      .prepare(`DELETE FROM ${userTableName} WHERE id = ?;`)
      .bind(2)
      .run();
    await deleteOperation.txn?.wait();
    console.log(
      `Successfully deleted user with ID ${2} from table '${userTableName}'`,
    );
  } catch (err: any) {
    console.error(err.message);
  }
}
