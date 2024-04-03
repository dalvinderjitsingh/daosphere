"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ConnectKitButton, useModal } from "connectkit";
import { useAccount, useDisconnect } from "wagmi";
import { isWalletAddressAvailable } from "@/lib/db/utils";

export default function Nav() {
  const router = useRouter();
  const { isConnected, address } = useAccount();

  useEffect(() => {
    const checkUser = async () => {
      if (isConnected) {
        if (address !== undefined) {
          const isAvailable = await isWalletAddressAvailable(address);
          if (isAvailable) {
            // wallet address exists, handle accordingly
            router.push("/dashboard");
          } else {
            // wallet address does not exist, handle accordingly
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
