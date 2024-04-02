"use client";

import { useRouter } from "next/navigation";
import UserSignUpForm from "@/components/UserSignUpForm";
import React, { useState, useEffect } from "react";
import { ConnectKitButton, useModal } from "connectkit";
import { useAccount, useDisconnect } from "wagmi";
import { isWalletAddressAvailable } from "@/lib/db/utils";

export default function Page() {
  const router = useRouter();
  const { openProfile, open } = useModal();
  const { isConnected, address, isConnecting } = useAccount();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  //   what if someone navigate to this page who havent connected their wallet = goes back straight to landing page //
  // wahat if someone who has connected their wallet and have already created a account navigate here = gets verified on user table

  useEffect(() => {
    const checkUser = async () => {
      if (isConnected) {
        if (address !== undefined) {
          const isAvailable = await isWalletAddressAvailable(address);
          if (isAvailable) {
            // wallet address exists, handle accordingly
            console.log("Wallet address already exist in users table");
            router.push("/dashboard");
          } else {
            // wallet address does not exist, handle accordingly
            console.log("Wallet address does not exist in users table");
            setIsLoading(false);
          }
        }
      } else {
        // router.push("/");
        // delete below and enable above
        setIsLoading(false);
      }
    };

    checkUser();
  }, [isConnected, address, router]);

  return (
    <main className="grid h-screen place-items-center p-5">
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="max-w-[410px]">
          {/* make it center */}
          <div className="flex max-w-prose flex-col items-center gap-y-5">
            <img alt="" className="w-24" src="../favicon.ico" />
            <h1 className="text-2xl font-bold">Sign up</h1>
            <h2>Fill in the form below to finish setting up your account.</h2>
          </div>
          <br />
          <UserSignUpForm />
        </div>
      )}
    </main>
  );
}
