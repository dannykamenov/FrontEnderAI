"use client";

import { Button } from "@/components/ui/button";
import { SignUpButton, SignedIn, SignedOut, useSession } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import ArrowDown from "./reusables/ArrowDown";

export default function Home() {
  const session = useSession();

  return (
    <main className="flex min-h-screen flex-col items-center p-2">
      <div className="text-center mt-14">
        <div className="flex items-center w-fit mx-auto border border-slate-400 rounded-2xl ">
          <p className="pl-4 pr-2">How our tools save you time & money</p>
          <div className="flex items-center hover:cursor-pointer" onClick={() => {document.getElementById("learn-more")?.scrollIntoView()}}>
            <p className="pl-2 pr-2 border-l border-slate-400">Learn more</p>
            <ArrowDown className="w-4 h-4 mr-4" />
          </div>
        </div>
        <h1 className="text-6xl text-center text font-semibold leading-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-blue-500 mt-3">
          Putting an End to Your Front End Problems <br /> Craft and Code with Ease.
        </h1>
        <p className="text-slate-400 text-center w-3/6 mx-auto">
          Unleash Your Front End&apos;s Full Potential - Design Smarter, Not
          Harder! With FrontEnder AI, you can streamline your workflow, save on
          design costs, and bring your projects to life faster and more
          efficiently. Let AI be your designer, and invest your valuable time in
          crafting the perfect user experience. Start building beautifully,
          start saving now!
        </p>
        <SignedIn>
          <Link href="/dashboard">
            <Button variant="cta" className="mt-4">
              Dashboard
            </Button>
          </Link>
        </SignedIn>
        <SignedOut>
          <SignUpButton mode="modal">
            <Button variant="cta" className="mt-4">
              Get Started
            </Button>
          </SignUpButton>
        </SignedOut>
      </div>
      <div>
      </div>
    </main>
  );
}
