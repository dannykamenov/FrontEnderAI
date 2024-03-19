"use client";

import { api } from "../../../convex/_generated/api";
import { useQuery } from "convex/react";
import { useOrganization, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Projects() {
  const user = useUser();
  const organization = useOrganization();

  let orgId: string | undefined = undefined;

  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }

  const projects = useQuery(api.projects.getProjects, {
    orgId: orgId ?? "skip",
  });

  return (
    <div>
      <h1>Projects</h1>
      <Link >
        <Button></Button>
      </Link>
      {projects?.map((project) => (
        <div key={project._id}>
          <p>{project.name}</p>
          <p>{project.description}</p>
          <p>{project.userId}</p>
        </div>
      )) ?? "Loading..."}
    </div>
  );
}
