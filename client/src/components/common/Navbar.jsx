"use client"

import Link from "next/link"
import { useAuth } from "../../context/AuthContext.jsx"
import { Button } from "../ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { UserCircle, LogOut, LayoutDashboard, BookOpen, FileText, BarChart } from "lucide-react"
import { USER_ROLES } from "../../lib/constants.js"

export default function Navbar() {
  const { user, logout } = useAuth()

  return (
    <nav className="bg-gradient-to-r from-purple-800 to-indigo-900 text-white p-4 shadow-xl">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="text-3xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-400 hover:from-purple-200 hover:to-pink-300 transition-all duration-300"
        >
          Assignment Portal
        </Link>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link
                href="/dashboard/assignments"
                className="hidden md:block text-lg font-medium hover:text-purple-200 transition-colors duration-200"
              >
                Assignments
              </Link>
              {user.role === USER_ROLES.STUDENT && (
                <Link
                  href="/dashboard/submissions"
                  className="hidden md:block text-lg font-medium hover:text-purple-200 transition-colors duration-200"
                >
                  My Submissions
                </Link>
              )}
              {user.role === USER_ROLES.INSTRUCTOR && (
                <Link
                  href="/dashboard/analytics"
                  className="hidden md:block text-lg font-medium hover:text-purple-200 transition-colors duration-200"
                >
                  Analytics
                </Link>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full border border-purple-500 hover:bg-purple-700 transition-colors"
                  >
                    <UserCircle className="h-6 w-6 text-purple-200" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-64 bg-gray-800 text-white border border-purple-700 shadow-lg"
                  align="end"
                  forceMount
                >
                  <div className="flex flex-col space-y-1 p-4 border-b border-purple-700">
                    <p className="text-lg font-semibold leading-none text-purple-300">{user.email}</p>
                    <p className="text-sm leading-none text-gray-400 capitalize">{user.role}</p>
                  </div>
                  <DropdownMenuItem className="cursor-pointer flex items-center gap-2 text-base hover:bg-purple-700 transition-colors">
                    <LayoutDashboard className="h-4 w-4" />
                    <Link href="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer flex items-center gap-2 text-base hover:bg-purple-700 transition-colors">
                    <BookOpen className="h-4 w-4" />
                    <Link href="/dashboard/assignments">Assignments</Link>
                  </DropdownMenuItem>
                  {user.role === USER_ROLES.STUDENT && (
                    <DropdownMenuItem className="cursor-pointer flex items-center gap-2 text-base hover:bg-purple-700 transition-colors">
                      <FileText className="h-4 w-4" />
                      <Link href="/dashboard/submissions">My Submissions</Link>
                    </DropdownMenuItem>
                  )}
                  {user.role === USER_ROLES.INSTRUCTOR && (
                    <DropdownMenuItem className="cursor-pointer flex items-center gap-2 text-base hover:bg-purple-700 transition-colors">
                      <BarChart className="h-4 w-4" />
                      <Link href="/dashboard/analytics">Analytics</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem
                    onClick={logout}
                    className="cursor-pointer flex items-center gap-2 text-base text-red-400 hover:bg-red-900 hover:text-white transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/login" className="text-lg font-medium hover:text-purple-200 transition-colors duration-200">
                Login
              </Link>
              <Link
                href="/register"
                className="text-lg font-medium hover:text-purple-200 transition-colors duration-200"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
