"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ConnectKitButton, useModal } from "connectkit";
import { useAccount, useDisconnect } from "wagmi";
import { getUserByWalletAddress } from "@/lib/tablelandUtils";

export default function Nav() {
  const router = useRouter();

  const { openProfile, open } = useModal();
  const { isConnected, address, isConnecting } = useAccount();

  useEffect(() => {
    if (isConnected) {
      // check if user has been inserted into user table
      // if not, present sign up modal and insert user into user table
      // if yes, route to home/dashboard
    }
  }, [isConnected]);

  // instead of isCOnnected i would like to use On COnnect, i dunno but feels as thou would be faster

  useEffect(() => {
    const checkUser = async () => {
      if (isConnected) {
        if (address !== undefined) {
          let user = await getUserByWalletAddress(address);
          if (user && user.wallet_address == address) {
            // User exists, handle accordingly
            router.push("/dashboard");
          } else {
            // User does not exist, handle accordingly
            router.push("/signup");
            // console.log(user);
            // console.log(address);
            // console.log(user && user.wallet_address);
          }
        }
      }
    };

    checkUser();
  }, [isConnected, address, router]);

  return (
    <nav className="fixed left-0 right-0 top-0 z-50">
      <ul className="flex items-center justify-between bg-zinc-200 p-5">
        <li>
          <h1>DATA DAO SPACE</h1>
        </li>
        <div className="flex gap-x-2.5">
          <li>
            <Button asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </li>
          <li>
            <Button asChild>
              <Link href="/discover">Discover DataDaos</Link>
            </Button>
          </li>
          <li>
            <Button asChild>
              <Link href="/marketplace">Marketplace</Link>
            </Button>
          </li>
          <li>
            <Button asChild>
              <Link href="/">Landing Page</Link>
            </Button>
          </li>
        </div>
        <div className="flex gap-x-2.5">
          <li>
            <ConnectKitButton />
          </li>
        </div>
      </ul>
    </nav>
  );
}
