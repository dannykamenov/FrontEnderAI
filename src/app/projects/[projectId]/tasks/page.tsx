"use client"

import { promises as fs } from "fs";
import path from "path";
import { Metadata } from "next";
import Image from "next/image";
import { z } from "zod";

import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { UserNav } from "./components/user-nav";
import { taskSchema } from "./data/schema";
import { Button } from "@/components/ui/button";
import { ListPlus } from "lucide-react";
import AddTask from "./components/dialog";
import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";

/* export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker build using Tanstack Table.",
}; */

export default function TaskPage(props: {
  params: { projectId: string }
}) {

    const getTasks = useQuery(api.projects.getProjectTasks, {
        projectId: props.params.projectId,
    })

    if(getTasks) {
        const tasks = z.array(taskSchema).parse(getTasks);
        return (
            <>
              <div className="hidden min-h-svh flex-1 flex-col space-y-8 p-8 md:flex">
                <div className="flex items-center justify-between space-y-2">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
                    <p className="text-muted-foreground">
                      Here&apos;s a list of your tasks for this month!
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <AddTask params={{ projectId: props.params.projectId }} />
                  </div>
                </div>
                <DataTable data={tasks} columns={columns} />
              </div>
            </>
          );
    }
}
