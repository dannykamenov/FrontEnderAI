"use client";

import { Button } from "@/components/ui/button";
import { SignUpButton, useSession } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  const session = useSession();

  return (
    <main className="flex min-h-screen flex-col items-center p-2">
      <h1 className="text-6xl text-center text font-semibold mt-14 leading-snug  text-transparent bg-clip-text bg-gradient-to-br from-white to-blue-500">
        No Designers? No Problem! <br /> Craft and Code with Ease.
      </h1>
      <p className="text-slate-400 text-center w-3/6">
        Unleash Your Front End&apos;s Full Potential - Design Smarter, Not
        Harder! With FrontEnder AI, you can streamline your workflow, save on
        design costs, and bring your projects to life faster and more
        efficiently. Let AI be your designer, and invest your valuable time in
        crafting the perfect user experience. Start building beautifully, start
        saving now!
      </p>
      <SignUpButton mode="modal">
        <Button variant="cta" className="mt-4">Get Started</Button>
      </SignUpButton>
    </main>
  );
}
