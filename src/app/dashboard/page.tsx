'use client';

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";

export default function Dashboard() {

    const {user} = useUser();

    const userInfo = () => {
        console.log(user?.id)
    }

    return (
        <div>
        <h1>Dashboard</h1>
        <p>Welcome to the dashboard</p>
        <Button onClick={userInfo}>User Info</Button>
        </div>
    );
}