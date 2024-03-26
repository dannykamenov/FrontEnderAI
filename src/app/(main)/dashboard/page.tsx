'use client';

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { useAction, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/navigation";

export default function Dashboard() {

    const {user} = useUser();
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
    );
}