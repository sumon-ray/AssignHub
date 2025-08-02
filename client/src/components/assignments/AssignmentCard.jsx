"use client";

import { format } from "date-fns";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Calendar } from "lucide-react";
import Link from "next/link";
import { USER_ROLES } from "../../lib/constants.js";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function AssignmentCard({ assignment, userRole }) {
  const deadline = new Date(assignment.deadline);
  const isInstructor = userRole === USER_ROLES.INSTRUCTOR;

  const buttonVariants = {
    hover: { scale: 1.03, boxShadow: "0px 6px 15px rgba(139, 92, 246, 0.4)" },
    tap: { scale: 0.98 },
  };

  return (
    <Card className="bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-xl shadow-2xl border border-purple-700 hover:border-purple-500 transform hover:-translate-y-2 transition-all duration-300 backdrop-blur-sm bg-opacity-80">
      <CardHeader className="pb-4">
        <CardTitle className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-2 drop-shadow-md">
          {assignment.title}
        </CardTitle>
        <CardDescription className="text-gray-400 flex items-center gap-2 text-base">
          <Calendar className="h-5 w-5 text-purple-300" />
          <span className="font-medium">Due: {format(deadline, "PPP p")}</span>
        </CardDescription>
        {assignment.instructor && (
          <CardDescription className="text-gray-400 text-sm mt-1">
            Created by:{" "}
            <span className="font-semibold text-purple-300">
              {assignment.instructor.email}
            </span>
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex items-start gap-2 text-gray-300">
          <BookOpen className="h-6 w-6 text-purple-300 flex-shrink-0 mt-1" />
          <p className="text-lg leading-relaxed">{assignment.description}</p>
        </div>
        <div className="flex justify-end pt-4">
          {isInstructor ? (
            <Link href={`/dashboard/assignments/${assignment._id}/submissions`}>
              <motion.button
                className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 hover:from-purple-700 hover:to-indigo-800 text-white text-lg px-6 py-3 rounded-lg shadow-md"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                View Submissions <ArrowRight className="h-5 w-5 ml-2" />
              </motion.button>
            </Link>
          ) : (
            <Link href={`/dashboard/assignments/${assignment._id}/submit`}>
              <motion.button
                className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 hover:from-purple-700 hover:to-indigo-800 text-white text-lg px-6 py-3 rounded-lg shadow-md"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Submit Assignment <ArrowRight className="h-5 w-5 ml-2" />
              </motion.button>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
// text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600
