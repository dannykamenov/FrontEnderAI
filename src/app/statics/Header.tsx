import { Button } from "@/components/ui/button";
import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";

const Header = () => {
  return (
    <nav className="border-b border-slate-400 p-5 flex justify-evenly  mx-auto items-center">
      <div>
        <Link href="/" className="">
          &lt;/FrontEnder&gt; <sub>.ai</sub>
        </Link>
      </div>
      <div>
        <Link href="/about" className="p-2 hover:text-slate-400 hover:transition-all">About</Link>
        <Link href="/about" className="p-2 hover:text-slate-400 hover:transition-all">Pricing</Link>
        <Link href="/about" className="p-2 hover:text-slate-400 hover:transition-all">Updates</Link>
      </div>
      <div className="flex items-center ">
        <SignedOut>
          <SignInButton mode="modal" className="p-2 hover:text-slate-400 hover:transition-all">Login</SignInButton>
          <SignUpButton mode="modal">
            <Button variant="cta">Get Started</Button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <div className="pr-5"><UserButton /></div>
          <SignOutButton>
            <Button variant="destructive">Sign Out</Button>
          </SignOutButton>
        </SignedIn>
      </div>
    </nav>
  );
};

export default Header;
