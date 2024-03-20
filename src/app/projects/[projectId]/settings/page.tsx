import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export default function ProjectSettings() {
  return (
    <div className="m-6 w-full">
      <h1 className="text-4xl font-bold mb-6">Project Settings</h1>
      <Card className="w-1/3">
        <CardHeader>
          <CardTitle></CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  );
}
