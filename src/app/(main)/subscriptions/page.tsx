"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { useAction, useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import { Check, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Subscriptions() {
    const pay = useAction(api.stripe.pay);
    const router = useRouter();

    const handlePay = async (productId: string) => {
        const plan_name = productId === process.env.NEXT_PUBLIC_PRO_PLAN! ? "pro" : "premium";
        const url = await pay({
            productId: productId,
            plan_name: plan_name
        });
        router.push(url);
    }

    const user = useQuery(api.users.getMe);
    const cancel = useAction(api.stripe.cancel);

    const handleInfo = async () => {
        console.log(user);
    };

    const handleCancel = async () => {
        if(!user || !user.sub_id) return;

        const result = await cancel({
            subscriptionId: user.sub_id
        });

    };

  return (
    <div className="min-h-screen dark:bg-grid-white/[0.03] bg-grid-black/[0.03]">
      <div className="flex flex-col items-center ">
        <h1 className="text-4xl font-semibold mt-20">Subscriptions</h1>
        <p className="text-slate-400 mt-2">
          Choose the perfect plan for your needs!
        </p>
      </div>
      <div className="flex flex-row items-center mt-10 w-4/6 mx-auto justify-between">
        <div className="flex flex-col items-center basis-auto px-5 text-center py-10 mx-5 dark:bg-gradient-to-t dark:from-slate-500 dark:to-black rounded-xl border-2 border-black dark:border-white bg-gradient-to-t from-slate-500 to-white">
          <div className="text-center">
            <h2 className="text-6xl font-semibold">
              {" "}
              <sup className="-mr-3">$</sup> 0
            </h2>
            <h2 className="text-base font-semibold">PER MONTH</h2>
          </div>
          <h2 className="text-2xl font-semibold mt-4 mb-4">Free</h2>
          <div>
            <p className="flex items-center">
              <Check className="w-5 h-5 mr-2" />
              Manage 1 Project
            </p>
            <p className="flex items-center">
              <Check className="w-5 h-5 mr-2" />
              Access to Tasks
            </p>
            <p className="flex items-center">
              <Check className="w-5 h-5 mr-2" />
              Access to Documentation
            </p>
          </div>
          <Button className="mt-4 w-9/12" variant="cta">
            Subscribe
          </Button>
          <p className=" mt-2"> No subscription required!</p>
        </div>
        <div className="flex flex-col items-center basis-auto px-10 text-center py-10 mx-5 dark:bg-gradient-to-t dark:from-slate-500 dark:to-black rounded-xl border-2 border-black dark:border-white bg-gradient-to-t from-slate-500 to-white relative">
            <Badge variant="cta" className="absolute top-3 right-3">Recommended</Badge>
          <div className="text-center">
            <h2 className="text-6xl font-semibold">
              {" "}
              <sup className="-mr-3">$</sup> 15
            </h2>
            <h2 className="text-base font-semibold">PER MONTH</h2>
          </div>
          <h2 className="text-2xl font-semibold mt-4 mb-4">Pro</h2>
          <div>
            <p className="flex items-center">
              <Check className="w-5 h-5 mr-2" />
              Manage All Your Project
            </p>
            <p className="flex items-center">
              <Check className="w-5 h-5 mr-2" />
              Access to Tasks
            </p>
            <p className="flex items-center">
              <Check className="w-5 h-5 mr-2" />
              Access to Documentation
            </p>
            <p className="flex items-center">
              <Check className="w-5 h-5 mr-2" />
              Access to Analytics
            </p>
            <p className="flex items-center">
              <Check className="w-5 h-5 mr-2" />
              Access to QuickStart
            </p>
            <p className="flex items-center">
              <Check className="w-5 h-5 mr-2" />
              Full AI Tools Access
            </p>
            <p className="flex items-center">
              <Check className="w-5 h-5 mr-2" />
              Priority Support
            </p>
            <p className="flex items-center">
              <Check className="w-5 h-5 mr-2" />
              Access to ALL Future Updates
            </p>
          </div>
          <Button className="mt-4 w-9/12" variant="cta" onClick={() => handlePay(process.env.NEXT_PUBLIC_PRO_PLAN!)}>
            Subscribe
          </Button>
          <p className=" mt-2">Our Best Deal <br /> 7-day free trial included. </p>
        </div>
        <div className="flex flex-col items-center basis-auto px-5 text-center py-10 mx-5 dark:bg-gradient-to-t dark:from-slate-500 dark:to-black rounded-xl border-2 border-black dark:border-white bg-gradient-to-t from-slate-500 to-white">
          <div className="text-center">
            <h2 className="text-6xl font-semibold">
              {" "}
              <sup className="-mr-3">$</sup> 5
            </h2>
            <h2 className="text-base font-semibold">PER MONTH</h2>
          </div>
          <h2 className="text-2xl font-semibold mt-4 mb-4">Premium</h2>
          <div>
            <p className="flex items-center">
              <Check className="w-5 h-5 mr-2" />
              Manage up to 5 Project
            </p>
            <p className="flex items-center">
              <Check className="w-5 h-5 mr-2" />
              Access to Tasks
            </p>
            <p className="flex items-center">
              <Check className="w-5 h-5 mr-2" />
              Access to Documentation
            </p>
            <p className="flex items-center">
              <Check className="w-5 h-5 mr-2" />
              Access to Analytics
            </p>
            <p className="flex items-center">
              <Check className="w-5 h-5 mr-2" />
              Limited AI Tools Access
            </p>
          </div>
        <Button className="mt-4 w-9/12" variant="cta" onClick={() => handlePay(process.env.NEXT_PUBLIC_PREMIUM_PLAN!)}>
            Subscribe
        </Button>
          <p className=" mt-2">Great For Starters <br /> 7-day free trial included. </p>
        </div>
      </div>
      <Button className="mt-10" variant="cta" onClick={handleCancel}>Cancel</Button>
      <Button className="mt-10" variant="cta" onClick={handleInfo}>Info</Button>

    </div>
  );
}
