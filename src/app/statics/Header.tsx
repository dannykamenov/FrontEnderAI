import { Button } from "@/components/ui/button";
import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  UserProfile,
  useSession,
} from "@clerk/nextjs";
import Link from "next/link";

const Header = () => {
  return (
    <nav className="border-b p-5 flex justify-evenly  mx-auto items-center">
      <div>
        <Link href="/">
          &lt;/FrontEnder&gt; <sub>.ai</sub>
        </Link>
      </div>
      <div>
        <Link href="/about" className="p-2 hover:text-slate-400 hover:transition-all">About</Link>
        <Link href="/about" className="p-2 hover:text-slate-400 hover:transition-all">Pricing</Link>
        <Link href="/about" className="p-2 hover:text-slate-400 hover:transition-all">Updates</Link>
      </div>
      <div className="flex ">
        <SignedOut>
          <SignInButton mode="modal" className="p-2 hover:text-slate-400 hover:transition-all">Login</SignInButton>
          <SignUpButton mode="modal">
            <Button variant="cta">Get Started</Button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <SignOutButton>
            <Button variant="destructive">Sign Out</Button>
          </SignOutButton>
          <UserButton></UserButton>
        </SignedIn>
      </div>
    </nav>
  );
};

export default Header;
