
import React from "react";
import { Database } from "@tableland/sdk";
import { Wallet, getDefaultProvider } from "ethers";

export default function TablelandTest() {
  const wallet = new Wallet(process.env.PRIVATE_KEY);

  const provider = getDefaultProvider("https://rpc.ankr.com/filecoin_testnet");

  const signer = wallet.connect(provider);

  return <div>TablelandTest</div>;
}
