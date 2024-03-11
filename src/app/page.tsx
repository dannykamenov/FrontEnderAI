"use client";

import { Button } from "@/components/ui/button";
import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  useSession,
} from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  const session = useSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-2">
      <h1>Hello!</h1>
      <SignedOut>
        <SignInButton mode="modal" ><Button>Sign In</Button></SignInButton>
      </SignedOut>
      <SignedIn>
        <SignOutButton><Button>Sign Out</Button></SignOutButton>
      </SignedIn>
      <Button>Click me</Button>
    </main>
  );
}
