"use client";

import { useRouter } from "next/navigation";
import UserSignUpForm from "@/components/UserSignUpForm";
import React, { useState, useEffect } from "react";
import { ConnectKitButton, useModal } from "connectkit";
import { useAccount, useDisconnect } from "wagmi";
import { getUserByWalletAddress } from "@/lib/tablelandUtils";

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
          let user = await getUserByWalletAddress(address);
          if (user && user.wallet_address == address) {
            // User exists, handle accordingly
            router.push("/");
          } else {
            // User does not exist, handle accordingly
            setIsLoading(false);
          }
        }
      } else {
        router.push("/");
      }
    };

    checkUser();
  }, [isConnected, address, router]);

  return (
    <main className="grid h-screen place-items-center p-5">
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          {/* make it center */}
          <div className="flex flex-col items-center gap-y-5">
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
