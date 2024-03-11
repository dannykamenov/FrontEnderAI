import { Button } from "@/components/ui/button";
import { SignInButton, SignOutButton, SignUpButton, SignedIn, SignedOut, useSession } from "@clerk/nextjs";
import Link from "next/link";

const Header = () => {

  return (
    <nav className="border-b p-5">
      <Link href="/">FrontEnderAI</Link>
      <Link href="/about">About</Link>
      <SignedOut>
        <SignInButton mode="modal">
          Login
        </SignInButton>
        <SignUpButton mode="modal">
          <Button variant="cta">Get Started</Button>
        </SignUpButton>
      </SignedOut>
      <SignedIn>
        <SignOutButton>
          <Button>Sign Out</Button>
        </SignOutButton>
      </SignedIn>
    </nav>
  );
};

export default Header;
