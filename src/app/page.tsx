import LandingPageNav from "@/components/nav/LandingPageNav";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import UserSignUpForm from "@/components/UserSignUpForm";

export default function Home() {
  return (
    <div className="">
      <LandingPageNav />
      <main className="grid h-screen place-items-center">
        <div className="flex flex-col items-center gap-y-6">
          <h1 className="text-5xl font-black">DATA DAO SPACE</h1>
          <p className="text-3xl font-light text-zinc-600">
            The next level DataDao SaaS and much more.
          </p>
          <br />
          <UserSignUpForm />
        </div>
      </main>
    </div>
  );
}
