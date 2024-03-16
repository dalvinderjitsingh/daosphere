"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ConnectKitButton } from "connectkit";

export default function DappNav() {
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
              <Link href="/discover">Discover</Link>
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
          <li>
            <ConnectKitButton />
          </li>
        </div>
      </ul>
    </nav>
  );
}
