import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";

export default function Dashboard() {

    const user = useUser();

    return (
        <div>
        <h1>Dashboard</h1>
        <p>Welcome to the dashboard</p>
        <Button onClick={
            () => {
                console.log(user);
            }
        }>User Info</Button>
        </div>
    );
}