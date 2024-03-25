"use client";

import ProjectI from "@/interfaces/projectInterface";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import SideNav from "@/components/global/SideNav";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function Project({ params }: { params: { projectId: string } }) {
  const getProject = useQuery(api.projects.getProjectById, {
    _id: params.projectId,
  });
  const me = useQuery(api.users.getMe);
  const router = useRouter();
  const [isConfirmed, setIsConfirmed] = useState(false);

useEffect(() => {
    if (me && getProject && me._id !== getProject.userId) {
        router.replace("/projects");
    } else if (me && getProject && me._id === getProject.userId) {
        setIsConfirmed(true);
    }
}, [me, getProject, router]);

if (!isConfirmed) {
    return (
        <div className="w-full h-full flex m-auto flex-col items-center mb-48 mt-36">
            <Loader2 className="w-48 h-48 animate-spin"></Loader2>
            <p>Loading...</p>
        </div>
    );
}

return (
    <>
        <div>
            <h1>Project</h1>
            <p>Welcome to the project page</p>
        </div>
    </>
);

  return (
    <>
      {isConfirmed && (
        <div>
          <h1>Project</h1>
          <p>Welcome to the project page</p>
        </div>
      )}
    </>
  );
}
