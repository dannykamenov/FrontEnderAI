
import { Cog } from "lucide-react"
import Link from "next/link"

export default function SideNav({projectId}: {projectId: string}) {
  return (
    <nav className="flex flex-col h-screen w-1/6 pt-6 pb-6 items-center px-2 md:px-4 gap-4 border-r border-slate-400 ">
      <Link
        className="flex items-center  rounded-lg border border-transparent/40 border-[#000] px-1 py-1 w-full text-base transition-colors hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50"
        href={`/projects/${projectId}`}
      >
        <HomeIcon className="h-5 w-5" />
        <span className="pl-3">Home</span>
      </Link>
      <Link
        className="flex items-center  rounded-lg border border-transparent/40 border-[#000] px-1 py-1 w-full text-base transition-colors hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50"
        href="#"
      >
        <ActivityIcon className="h-5 w-5" />
        <span className="pl-3">Activity</span>
      </Link>
      <Link
        className="flex items-center  rounded-lg border border-transparent/40 border-[#000] px-1 py-1 w-full text-base transition-colors hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50"
        href="#"
      >
        <CalendarIcon className="h-5 w-5" />
        <span className="pl-3">Calendar</span>

      </Link>
      <Link
        className="flex items-center  rounded-lg border border-transparent/40 border-[#000] px-1 py-1 w-full text-base transition-colors hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50"
        href="#"
      >
        <MessageSquareIcon className="h-5 w-5" />
        <span className="pl-3">Messages</span>
      </Link>
      <Link
        className="flex items-center  rounded-lg border border-transparent/40 border-[#000] px-1 py-1 w-full text-base transition-colors hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50"
        href={`/projects/${projectId}/settings`}
      >
        <Cog className="h-5 w-5" />
        <span className="pl-3">Project Settings</span>
      </Link>
    </nav>
  )
}

function ActivityIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  )
}


function CalendarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  )
}


function HomeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}


function MessageSquareIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}

function UserIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

