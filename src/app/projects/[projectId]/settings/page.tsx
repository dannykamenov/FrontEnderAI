"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Loader2 } from "lucide-react";

export default function ProjectSettings(props: {
  params: { projectId: string };
}) {
  const getProject = useQuery(api.projects.getProjectById, {
    _id: props.params.projectId,
  });


  return (
    <>
      {getProject === undefined && (
        <div className="w-full h-full flex m-auto flex-col items-center mb-48 mt-36">
          <Loader2 className="w-48 h-48 animate-spin"></Loader2>
          <p>Fetching your project info...</p>
        </div>
      )}
      {getProject !== undefined && getProject._id && (
        <div className="m-6 w-fit">
          <h1 className="text-4xl font-bold mb-6">Project Settings</h1>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Project Name</CardTitle>
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
      )}
    </>
  );
}
