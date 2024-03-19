"use client";

import { Button } from "@/components/ui/button";
import {
  OrganizationSwitcher,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  if (pathname !== "/") {
    return (
      <nav className="border-b border-slate-400 p-5 flex justify-evenly  mx-auto items-center">
        <div>
          <Link href="/" className="">
            &lt;/FrontEnder&gt; <sub>.ai</sub>
          </Link>
        </div>
        <div>
          <Link
            href="/projects"
            className="p-2 hover:text-slate-400 hover:transition-all"
          >
            Projects
          </Link>
          <Link
            href="/teams"
            className="p-2 hover:text-slate-400 hover:transition-all"
          >
            Teams
          </Link>
          <Link
            href="/my-community"
            className="p-2 hover:text-slate-400 hover:transition-all"
          >
            My Community
          </Link>
        </div>
        <div className="flex items-center ">
          <SignedIn>
            <Link
              href="/"
              className="p-2 hover:text-slate-400 hover:transition-all"
            >
              Home
            </Link>
            <div className="pl-5 flex gap-2">
              {/* <OrganizationSwitcher /> - only when paid */}
              <UserButton />
            </div>
          </SignedIn>
        </div>
      </nav>
    );
  } else {
    return (
      <nav className="border-b border-slate-400 p-5 flex justify-evenly  mx-auto items-center">
        <div>
          <Link href="/" className="">
            &lt;/FrontEnder&gt; <sub>.ai</sub>
          </Link>
        </div>
        <div>
          <Link
            href="/"
            className="p-2 hover:text-slate-400 hover:transition-all"
          >
            About
          </Link>
          <Link
            href="/"
            className="p-2 hover:text-slate-400 hover:transition-all"
          >
            Pricing
          </Link>
          <Link
            href="/"
            className="p-2 hover:text-slate-400 hover:transition-all"
          >
            Community
          </Link>
        </div>
        <div className="flex items-center ">
          <SignedOut>
            <SignInButton
              mode="modal"
              className="p-2 hover:text-slate-400 hover:transition-all"
            >
              Login
            </SignInButton>
            <SignUpButton mode="modal">
              <Button variant="cta">Get Started</Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <Button variant="cta">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <div className="pl-5 flex gap-2">
              {/* <OrganizationSwitcher /> - only when paid */}
              <UserButton />
            </div>
          </SignedIn>
        </div>
      </nav>
    );
  }
};

export default Header;
