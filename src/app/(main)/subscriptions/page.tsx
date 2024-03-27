"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { useAction, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";

export default function Subscriptions() {
  /*     const {user} = useUser();
    const pay = useAction(api.stripe.pay);
    const router = useRouter();
    const userInfo = () => {
        console.log(user?.id)
    }

    const subscribe = async () => {
        const url = await pay();
        router.push(url);
    }

    return (
        <div>
        <h1>Dashboard</h1>
        <p>Welcome to the dashboard</p>
        <Button onClick={userInfo}>User Info</Button>
        <Button onClick={subscribe}>Subscribe</Button>
        </div>
    ); */

  return (
    <div className="min-h-screen dark:bg-grid-white/[0.03] bg-grid-black/[0.03]">
      <div className="flex flex-col items-center ">
        <h1 className="text-4xl font-semibold mt-20">Subscriptions</h1>
        <p className="text-slate-400 mt-2">
          Choose the perfect plan for your needs!
        </p>
      </div>
      <div className="flex flex-row items-center mt-10 w-4/6 mx-auto justify-between">
        <div className="flex flex-col items-center basis-1/3 text-center">
          <div className="text-center">
            <h2 className="text-6xl font-semibold">
              {" "}
              <sup className="-mr-3">$</sup> 0
            </h2>
            <h2 className="text-base font-semibold">PER MONTH</h2>
          </div>
          <h2 className="text-2xl font-semibold">Free</h2>
          <div>
            <p className="flex items-center"><Check />Manage 1 Project</p>
            <p className="flex items-center"><Check />Access to Tasks</p>
            <p className="flex items-center"><Check />Access to Documentation</p>
          </div>
          <p className="text-slate-400 mt-2">Get started with our free plan</p>
          <Button className="mt-2">Subscribe</Button>
        </div>
        <div className="flex flex-col items-center basis-1/3 text-center">
          <div className="text-center">
            <h2 className="text-6xl font-semibold">
              {" "}
              <sup className="-mr-3">$</sup> 20
            </h2>
            <h2 className="text-base font-semibold">PER MONTH</h2>
          </div>
          <h2 className="text-2xl font-semibold">Pro</h2>
          <div>
            <p>Manage All Your Project</p>
            <p>Access to Tasks</p>
            <p>Access to Documentation</p>
          </div>
          <p className="text-slate-400 mt-2">
            Get access to all our premium features
          </p>
          <Button className="mt-2">Subscribe</Button>
        </div>
        <div className="flex flex-col items-center basis-1/3 text-center">
          <div className="text-center">
            <h2 className="text-6xl font-semibold">
              {" "}
              <sup className="-mr-3">$</sup> 10
            </h2>
            <h2 className="text-base font-semibold">PER MONTH</h2>
          </div>
          <h2 className="text-2xl font-semibold">Premium</h2>
          <div>
            <p>Manage up to 5 Project</p>
            <p>Access to Tasks</p>
            <p>Access to Documentation</p>
            <p>Limited AI Tools Access</p>
          </div>
          <p className="text-slate-400 mt-2">
            Get access to all our premium features
          </p>
          <Button className="mt-2">Subscribe</Button>
        </div>
      </div>
    </div>
  );
}
