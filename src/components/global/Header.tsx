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
import { clsx } from "clsx";
import { ModeToggle } from "../ui/mode-toggle";

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
        <div className="flex items-center">
          <Link
            href="/projects"
            className={clsx("p-2 hover:text-slate-400 hover:transition-all", {
              "border-slate-400 border-b text-slate-400": pathname === "/projects",
            
            })}
          >
            Projects
          </Link>
          <Link
            href="/teams"
            className={clsx("p-2 hover:text-slate-400 hover:transition-all", {
              "border-slate-400 border-b text-slate-400": pathname === "/teams",
            
            })}
          >
            Teams
          </Link>
          <Link
            href="/my-community"
            className={clsx("p-2 hover:text-slate-400 hover:transition-all", {
              "border-slate-400 border-b text-slate-400": pathname === "/my-community",
            
            })}
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
            <div className="pl-5 pr-5 flex gap-2">
              {/* <OrganizationSwitcher /> - only when paid */}
              <UserButton />
            </div>
          </SignedIn>
          <ModeToggle />
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
        <div className="flex items-center">
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
          <p
            className="p-2 text-slate-400 relative"
          >
            <s>Community</s><sup className="ml-2 absolute top-1 right-4">Coming Soon</sup>
          </p>
        </div>
        <div className="flex items-center ">
          <SignedOut>
            <SignInButton
              mode="modal"
            >
              <div className="p-2 hover:text-slate-400 hover:transition-all cursor-pointer">Login</div>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button variant="cta">Get Started</Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <Button variant="cta">
              <Link href="/projects">Dashboard</Link>
            </Button>
            <div className="pl-5 pr-5 flex gap-2">
              {/* <OrganizationSwitcher /> - only when paid */}
              <UserButton />
            </div>
          </SignedIn>
          <ModeToggle />
        </div>
      </nav>
    );
  }
};

export default Header;
