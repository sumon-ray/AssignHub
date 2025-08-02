"use client";

import {
  BarChart,
  BookOpen,
  FileText,
  LayoutDashboard,
  LogOut,
  PlusCircle,
  UserCircle,
} from "lucide-react"; // Added Home and PlusCircle for general links
import Link from "next/link";
import { useAuth } from "../../context/AuthContext.jsx"; // Assuming this path is correct
import { USER_ROLES } from "../../lib/constants.js"; // Assuming this path is correct
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-lg border-b border-gray-800">
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand Logo/Name */}
        <Link
          href="/"
          className="text-3xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 hover:from-blue-300 hover:to-purple-500 transition-all duration-300"
        >
          AssignHub
        </Link>

        {/* Navigation Links and User Controls */}
        <div className="flex items-center space-x-2 md:space-x-4">
          {user ? (
            <>
              {/* Main Navigation Links (visible on larger screens) */}
              <Link href="/dashboard" passHref>
                <Button
                  variant="ghost"
                  className="hidden md:flex items-center gap-2 text-lg font-medium text-gray-200 hover:bg-gray-800 hover:text-purple-300 transition-colors duration-200 px-4 py-2 rounded-lg"
                >
                  <LayoutDashboard className="h-5 w-5" /> Dashboard
                </Button>
              </Link>
              <Link href="/dashboard/assignments" passHref>
                <Button
                  variant="ghost"
                  className="hidden md:flex items-center gap-2 text-lg font-medium text-gray-200 hover:bg-gray-800 hover:text-purple-300 transition-colors duration-200 px-4 py-2 rounded-lg"
                >
                  <BookOpen className="h-5 w-5" /> Assignments
                </Button>
              </Link>
              {user.role === USER_ROLES.STUDENT && (
                <Link href="/dashboard/submissions" passHref>
                  <Button
                    variant="ghost"
                    className="hidden md:flex items-center gap-2 text-lg font-medium text-gray-200 hover:bg-gray-800 hover:text-purple-300 transition-colors duration-200 px-4 py-2 rounded-lg"
                  >
                    <FileText className="h-5 w-5" /> My Submissions
                  </Button>
                </Link>
              )}
              {user.role === USER_ROLES.INSTRUCTOR && (
                <>
                  <Link href="/dashboard/assignments/create" passHref>
                    <Button
                      variant="ghost"
                      className="hidden md:flex items-center gap-2 text-lg font-medium text-gray-200 hover:bg-gray-800 hover:text-purple-300 transition-colors duration-200 px-4 py-2 rounded-lg"
                    >
                      <PlusCircle className="h-5 w-5" /> Create Assignment
                    </Button>
                  </Link>
                  <Link href="/dashboard/analytics" passHref>
                    <Button
                      variant="ghost"
                      className="hidden md:flex items-center gap-2 text-lg font-medium text-gray-200 hover:bg-gray-800 hover:text-purple-300 transition-colors duration-200 px-4 py-2 rounded-lg"
                    >
                      <BarChart className="h-5 w-5" /> Analytics
                    </Button>
                  </Link>
                </>
              )}

              {/* User Dropdown Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full border border-purple-600 hover:bg-purple-800 transition-colors duration-200 flex items-center justify-center"
                  >
                    <UserCircle className="h-6 w-6 text-purple-300" />
                    <span className="sr-only">User menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-64 bg-gray-800 text-white border border-purple-700 shadow-xl rounded-lg p-2"
                  align="end"
                  forceMount
                >
                  <div className="flex flex-col space-y-1 p-4 border-b border-purple-700 mb-2">
                    <p className="text-lg font-semibold leading-none text-purple-300 truncate">
                      {user.email}
                    </p>
                    <p className="text-sm leading-none text-gray-400 capitalize">
                      {user.role}
                    </p>
                  </div>
                  <DropdownMenuItem className="cursor-pointer flex items-center gap-3 text-base hover:bg-purple-700 transition-colors duration-200 rounded-md px-3 py-2">
                    <LayoutDashboard className="h-5 w-5 text-purple-400" />
                    <Link href="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer flex items-center gap-3 text-base hover:bg-purple-700 transition-colors duration-200 rounded-md px-3 py-2">
                    <BookOpen className="h-5 w-5 text-purple-400" />
                    <Link href="/dashboard/assignments">Assignments</Link>
                  </DropdownMenuItem>
                  {user.role === USER_ROLES.STUDENT && (
                    <DropdownMenuItem className="cursor-pointer flex items-center gap-3 text-base hover:bg-purple-700 transition-colors duration-200 rounded-md px-3 py-2">
                      <FileText className="h-5 w-5 text-purple-400" />
                      <Link href="/dashboard/submissions">My Submissions</Link>
                    </DropdownMenuItem>
                  )}
                  {user.role === USER_ROLES.INSTRUCTOR && (
                    <>
                      <DropdownMenuItem className="cursor-pointer flex items-center gap-3 text-base hover:bg-purple-700 transition-colors duration-200 rounded-md px-3 py-2">
                        <PlusCircle className="h-5 w-5 text-purple-400" />
                        <Link href="/dashboard/assignments/create">
                          Create Assignment
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer flex items-center gap-3 text-base hover:bg-purple-700 transition-colors duration-200 rounded-md px-3 py-2">
                        <BarChart className="h-5 w-5 text-purple-400" />
                        <Link href="/dashboard/analytics">Analytics</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuItem
                    onClick={logout}
                    className="cursor-pointer flex items-center gap-3 text-base text-red-400 hover:bg-red-900 hover:text-white transition-colors duration-200 rounded-md px-3 py-2 mt-2"
                  >
                    <LogOut className="h-5 w-5" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              {/* Login/Register Buttons */}
              <Link href="/login" passHref>
                <Button
                  variant="ghost"
                  className="text-lg font-medium text-gray-200 hover:bg-gray-800 hover:text-purple-300 transition-colors duration-200 px-4 py-2 rounded-lg"
                >
                  Login
                </Button>
              </Link>
              <Link href="/register" passHref>
                <Button
                  variant="default"
                  className="text-lg font-medium bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white transition-all duration-300 px-4 py-2 rounded-lg shadow-md"
                >
                  Register
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
