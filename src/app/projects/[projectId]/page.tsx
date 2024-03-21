"use client";

import ProjectI from "@/interfaces/projectInterface";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import SideNav from "@/app/statics/SideNav";

export default function Project({ params }: { params: { projectId: string } }) {
  const getProject = useQuery(api.projects.getProjectById, {
    _id: params.projectId,
  });

  return (
    <div>
      <h1>Project</h1>
      <p>Welcome to the project page</p>
    </div>
  );
}
