"use client";

import { AreaChart, Cog, Home, ListTodo, MessageSquare } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";

export default function SideNav({ projectId }: { projectId: string }) {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col h-auto w-1/6 pt-6 pb-6 items-center px-2 md:px-4 gap-4 border-r border-slate-400 ">
      <Link
        className={clsx(
          "flex items-center  rounded-lg border border-transparent/40 border-[#000] px-1 py-1 w-full text-base transition-colors hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50",
          {
            "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50":
              pathname === `/projects/${projectId}`,
          }
        )}
        href={`/projects/${projectId}`}
      >
        <Home className="h-5 w-5 ml-2" />
        <span className="pl-3">Home</span>
      </Link>
      <Link
        className={clsx(
          "flex items-center  rounded-lg border border-transparent/40 border-[#000] px-1 py-1 w-full text-base transition-colors hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50",
          {
            "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50":
              pathname === `/projects/${projectId}/analytics`,
          }
        )}
        href={`/projects/${projectId}/analytics`}
      >
        <AreaChart className="h-5 w-5 ml-2" />
        <span className="pl-3">Analytics</span>
      </Link>
      <Link
        className={clsx(
          "flex items-center  rounded-lg border border-transparent/40 border-[#000] px-1 py-1 w-full text-base transition-colors hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50",
          {
            "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50":
              pathname === `/projects/${projectId}/tasks`,
          }
        )}
        href={`/projects/${projectId}/tasks`}
      >
        <ListTodo className="h-5 w-5 ml-2" />
        <span className="pl-3">Tasks</span>
      </Link>
      <Link
        className={clsx(
          "flex items-center  rounded-lg border border-transparent/40 border-[#000] px-1 py-1 w-full text-base transition-colors hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50",
          {
            "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50":
              pathname === `/projects/${projectId}/messages`,
          }
        )}
        href={`/projects/${projectId}/messages`}
      >
        <MessageSquare className="h-5 w-5 ml-2" />
        <span className="pl-3">Messages</span>
      </Link>
      <Link
        className={clsx(
          "flex items-center  rounded-lg border border-transparent/40 border-[#000] px-1 py-1 w-full text-base transition-colors hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50",
          {
            "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50":
              pathname === `/projects/${projectId}/settings`,
          }
        )}
        href={`/projects/${projectId}/settings`}
      >
        <Cog className="h-5 w-5 ml-2" />
        <span className="pl-3">Project Settings</span>
      </Link>
    </nav>
  );
}


