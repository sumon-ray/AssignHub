"use client";

import AssignmentCard from "@/components/assignments/AssignmentCard.jsx"; // Assuming this path is correct
import LoadingSpinner from "@/components/common/LoadingSpinner.jsx"; // Assuming this path is correct
import { Button } from "@/components/ui/button"; // shadcn/ui Button
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; // shadcn/ui Card
import { useAuth } from "@/context/AuthContext.jsx"; // Assuming this path is correct
import api from "@/lib/api.js"; // Assuming this path is correct
import { USER_ROLES } from "@/lib/constants.js"; // Assuming this path is correct
import { motion } from "framer-motion";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        setLoading(true);
        const data = await api("/assignments");
        setAssignments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAssignments();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <main className="min-h-screen bg-gray-950 text-gray-100 p-6 md:p-8 lg:p-10">
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-6">
          <h1 className="text-4xl text-left  font-extrabold ">
            Assignments
          </h1>
          {user && user.role === USER_ROLES.INSTRUCTOR && (
            <Link href="/dashboard/assignments/create" passHref>
              <Button
                className="bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white text-lg px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                asChild // Use asChild to pass props to the Link component
              >
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <PlusCircle className="h-5 w-5" /> Create New Assignment
                </motion.a>
              </Button>
            </Link>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner />
          </div>
        )}

        {/* Error State */}
        {error && (
          <Card className="bg-red-900/30 border-red-700 text-red-400 text-center p-6 mt-8 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Error Loading Assignments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-lg">
                {"Failed to fetch assignments. Please try again later."}
              </CardDescription>
              <p className="mt-2 text-sm">Details: {error}</p>
            </CardContent>
          </Card>
        )}

        {/* No Assignments State */}
        {!loading && !error && assignments.length === 0 && (
          <Card className="bg-gray-800/70 border-gray-700 text-gray-300 text-center p-10 mt-8 shadow-lg backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-purple-400">
                No Assignments Yet!
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-xl leading-relaxed">
                {
                  "It looks like there are no assignments available right now. Check back later or create one if you're an instructor!"
                }
              </CardDescription>
            </CardContent>
          </Card>
        )}

        {/* Assignments Grid */}
        {!loading && !error && assignments.length > 0 && (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {assignments.map((assignment) => (
              <motion.div key={assignment._id} variants={itemVariants}>
                <AssignmentCard assignment={assignment} userRole={user?.role} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </main>
  );
}
