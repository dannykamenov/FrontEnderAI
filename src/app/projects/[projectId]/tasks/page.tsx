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

export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker build using Tanstack Table.",
};

export default async function TaskPage() {
  const tasks = [
    {
      id: "TASK-8782",
      title:
        "You can't compress the program without quantifying the open-source SSD pixel!",
      status: "in progress",
      label: "documentation",
      priority: "medium",
    },
    {
      id: "TASK-7878",
      title:
        "Try to calculate the EXE feed, maybe it will index the multi-byte pixel!",
      status: "backlog",
      label: "documentation",
      priority: "medium",
    },
    {
      id: "TASK-7839",
      title: "We need to bypass the neural TCP card!",
      status: "todo",
      label: "bug",
      priority: "high",
    },
    {
      id: "TASK-5562",
      title:
        "The SAS interface is down, bypass the open-source pixel so we can back up the PNG bandwidth!",
      status: "backlog",
      label: "feature",
      priority: "medium",
    },
    {
      id: "TASK-8686",
      title:
        "I'll parse the wireless SSL protocol, that should driver the API panel!",
      status: "canceled",
      label: "feature",
      priority: "medium",
    },
    {
      id: "TASK-1280",
      title:
        "Use the digital TLS panel, then you can transmit the haptic system!",
      status: "done",
      label: "bug",
      priority: "high",
    },
    {
      id: "TASK-7262",
      title:
        "The UTF8 application is down, parse the neural bandwidth so we can back up the PNG firewall!",
      status: "done",
      label: "feature",
      priority: "high",
    },
    {
      id: "TASK-8782",
      title:
        "You can't compress the program without quantifying the open-source SSD pixel!",
      status: "in progress",
      label: "documentation",
      priority: "medium",
    },
    {
      id: "TASK-7878",
      title:
        "Try to calculate the EXE feed, maybe it will index the multi-byte pixel!",
      status: "backlog",
      label: "documentation",
      priority: "medium",
    },
    {
      id: "TASK-7839",
      title: "We need to bypass the neural TCP card!",
      status: "todo",
      label: "bug",
      priority: "high",
    },
    {
      id: "TASK-5562",
      title:
        "The SAS interface is down, bypass the open-source pixel so we can back up the PNG bandwidth!",
      status: "backlog",
      label: "feature",
      priority: "medium",
    },
    {
      id: "TASK-8686",
      title:
        "I'll parse the wireless SSL protocol, that should driver the API panel!",
      status: "canceled",
      label: "feature",
      priority: "medium",
    },
    {
      id: "TASK-1280",
      title:
        "Use the digital TLS panel, then you can transmit the haptic system!",
      status: "done",
      label: "bug",
      priority: "high",
    },
    {
      id: "TASK-7262",
      title:
        "The UTF8 application is down, parse the neural bandwidth so we can back up the PNG firewall!",
      status: "done",
      label: "feature",
      priority: "high",
    },
    {
      id: "TASK-8782",
      title:
        "You can't compress the program without quantifying the open-source SSD pixel!",
      status: "in progress",
      label: "documentation",
      priority: "medium",
    },
    {
      id: "TASK-7878",
      title:
        "Try to calculate the EXE feed, maybe it will index the multi-byte pixel!",
      status: "backlog",
      label: "documentation",
      priority: "medium",
    },
    {
      id: "TASK-7839",
      title: "We need to bypass the neural TCP card!",
      status: "todo",
      label: "bug",
      priority: "high",
    },
    {
      id: "TASK-5562",
      title:
        "The SAS interface is down, bypass the open-source pixel so we can back up the PNG bandwidth!",
      status: "backlog",
      label: "feature",
      priority: "medium",
    },
    {
      id: "TASK-8686",
      title:
        "I'll parse the wireless SSL protocol, that should driver the API panel!",
      status: "canceled",
      label: "feature",
      priority: "medium",
    },
    {
      id: "TASK-1280",
      title:
        "Use the digital TLS panel, then you can transmit the haptic system!",
      status: "done",
      label: "bug",
      priority: "high",
    },
    {
      id: "TASK-7262",
      title:
        "The UTF8 application is down, parse the neural bandwidth so we can back up the PNG firewall!",
      status: "done",
      label: "feature",
      priority: "high",
    },
    {
      id: "TASK-8782",
      title:
        "You can't compress the program without quantifying the open-source SSD pixel!",
      status: "in progress",
      label: "documentation",
      priority: "medium",
    },
    {
      id: "TASK-7878",
      title:
        "Try to calculate the EXE feed, maybe it will index the multi-byte pixel!",
      status: "backlog",
      label: "documentation",
      priority: "medium",
    },
    {
      id: "TASK-7839",
      title: "We need to bypass the neural TCP card!",
      status: "todo",
      label: "bug",
      priority: "high",
    },
    {
      id: "TASK-5562",
      title:
        "The SAS interface is down, bypass the open-source pixel so we can back up the PNG bandwidth!",
      status: "backlog",
      label: "feature",
      priority: "medium",
    },
    {
      id: "TASK-8686",
      title:
        "I'll parse the wireless SSL protocol, that should driver the API panel!",
      status: "canceled",
      label: "feature",
      priority: "medium",
    },
    {
      id: "TASK-1280",
      title:
        "Use the digital TLS panel, then you can transmit the haptic system!",
      status: "done",
      label: "bug",
      priority: "high",
    },
    {
      id: "TASK-7262",
      title:
        "The UTF8 application is down, parse the neural bandwidth so we can back up the PNG firewall!",
      status: "done",
      label: "feature",
      priority: "high",
    },
    {
      id: "TASK-8782",
      title:
        "You can't compress the program without quantifying the open-source SSD pixel!",
      status: "in progress",
      label: "documentation",
      priority: "medium",
    },
    {
      id: "TASK-7878",
      title:
        "Try to calculate the EXE feed, maybe it will index the multi-byte pixel!",
      status: "backlog",
      label: "documentation",
      priority: "medium",
    },
    {
      id: "TASK-7839",
      title: "We need to bypass the neural TCP card!",
      status: "todo",
      label: "bug",
      priority: "high",
    },
    {
      id: "TASK-5562",
      title:
        "The SAS interface is down, bypass the open-source pixel so we can back up the PNG bandwidth!",
      status: "backlog",
      label: "feature",
      priority: "medium",
    },
    {
      id: "TASK-8686",
      title:
        "I'll parse the wireless SSL protocol, that should driver the API panel!",
      status: "canceled",
      label: "feature",
      priority: "medium",
    },
    {
      id: "TASK-1280",
      title:
        "Use the digital TLS panel, then you can transmit the haptic system!",
      status: "done",
      label: "bug",
      priority: "high",
    },
    {
      id: "TASK-7262",
      title:
        "The UTF8 application is down, parse the neural bandwidth so we can back up the PNG firewall!",
      status: "done",
      label: "feature",
      priority: "high",
    },
    {
      id: "TASK-8782",
      title:
        "You can't compress the program without quantifying the open-source SSD pixel!",
      status: "in progress",
      label: "documentation",
      priority: "medium",
    },
    {
      id: "TASK-7878",
      title:
        "Try to calculate the EXE feed, maybe it will index the multi-byte pixel!",
      status: "backlog",
      label: "documentation",
      priority: "medium",
    },
    {
      id: "TASK-7839",
      title: "We need to bypass the neural TCP card!",
      status: "todo",
      label: "bug",
      priority: "high",
    },
    {
      id: "TASK-5562",
      title:
        "The SAS interface is down, bypass the open-source pixel so we can back up the PNG bandwidth!",
      status: "backlog",
      label: "feature",
      priority: "medium",
    },
    {
      id: "TASK-8686",
      title:
        "I'll parse the wireless SSL protocol, that should driver the API panel!",
      status: "canceled",
      label: "feature",
      priority: "medium",
    },
    {
      id: "TASK-1280",
      title:
        "Use the digital TLS panel, then you can transmit the haptic system!",
      status: "done",
      label: "bug",
      priority: "high",
    },
    {
      id: "TASK-7262",
      title:
        "The UTF8 application is down, parse the neural bandwidth so we can back up the PNG firewall!",
      status: "done",
      label: "feature",
      priority: "high",
    },
  ];

  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/tasks-light.png"
          width={1280}
          height={998}
          alt="Playground"
          className="block dark:hidden"
        />
        <Image
          src="/examples/tasks-dark.png"
          width={1280}
          height={998}
          alt="Playground"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <AddTask />
          </div>
        </div>
        <DataTable data={tasks} columns={columns} />
      </div>
    </>
  );
}
