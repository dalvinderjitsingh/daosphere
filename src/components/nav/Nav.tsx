"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ConnectKitButton, useModal } from "connectkit";
import { useAccount, useDisconnect } from "wagmi";
import { getUserByWalletAddress } from "@/lib/tablelandUtils";
import { isWalletAddressAvailable } from "@/lib/db/utils";

export default function Nav() {
  const router = useRouter();

  const { openProfile, open } = useModal();
  const { isConnected, address, isConnecting } = useAccount();

  // instead of isCOnnected i would like to use On COnnect, i dunno but feels as thou would be faster

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
            router.push("/signup");
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
