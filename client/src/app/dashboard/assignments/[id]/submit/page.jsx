"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { BookOpen, Calendar, CheckCircle, XCircle } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SubmissionForm from "../../../../../components/assignments/SubmissionForm.jsx";
import LoadingSpinner from "../../../../../components/common/LoadingSpinner.jsx";
import ProtectedRoute from "../../../../../components/common/ProtectedRoute.jsx";
import api from "../../../../../lib/api";
import { USER_ROLES } from "../../../../../lib/constants.js";

export default function SubmitAssignmentPage() {
  const { id } = useParams();
  const router = useRouter();
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        setLoading(true);
        const data = await api(`/assignments/${id}`);
        setAssignment(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchAssignment();
    }
  }, [id]);

  const handleSubmit = async (formData) => {
    setSubmitting(true);
    setError(null);
    setSuccess(false);
    try {
      await api(`/assignments/${id}/submit`, {
        method: "POST",
        body: JSON.stringify(formData),
      });
      setSuccess(true);
      setTimeout(() => {
        router.push("/dashboard/submissions");
      }, 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Animation variants
  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error && !assignment) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
        <Card className="bg-red-900/30 border-red-700 text-red-400 text-center p-6 shadow-lg max-w-md w-full">
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
              <XCircle className="h-6 w-6" /> Error Loading Assignment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-lg">
              {"Failed to fetch assignment details. Please try again later."}
            </CardDescription>
            <p className="mt-2 text-sm">Details: {error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!assignment) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
        <Card className="bg-gray-800/70 border-gray-700 text-gray-300 text-center p-10 shadow-lg backdrop-blur-sm max-w-md w-full">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-purple-400">
              Assignment Not Found
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-xl leading-relaxed">
              {
                "The assignment you are looking for does not exist or has been removed."
              }
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <ProtectedRoute allowedRoles={[USER_ROLES.STUDENT]}>
      <motion.div
        className="min-h-screen bg-gray-950 text-gray-100 p-6 md:p-8 lg:p-10"
        variants={pageVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container mx-auto max-w-6xl">
          {" "}
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 drop-shadow-lg mb-10 text-center">
            Submit Your Assignment
          </h1>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-900/30 border border-red-700 text-red-400 text-center mb-6 p-4 rounded-lg shadow-md flex items-center justify-center gap-3"
            >
              <XCircle className="h-5 w-5" /> {error}
            </motion.div>
          )}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-900/30 border border-green-700 text-green-400 text-center mb-6 p-4 rounded-lg shadow-md flex items-center justify-center gap-3"
            >
              <CheckCircle className="h-5 w-5" /> Submission successful!
              Redirecting...
            </motion.div>
          )}
          {/* Two-Column Layout for Assignment Details and Submission Form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column: Assignment Details Card */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="w-full bg-gray-800/70 text-white rounded-xl shadow-2xl border border-gray-700 backdrop-blur-sm relative overflow-hidden"
            >
              <Card className="bg-transparent border-none shadow-none p-6">
                <CardHeader className="pb-4">
                  <CardTitle className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-2">
                    {assignment.title}
                  </CardTitle>
                  <CardDescription className="text-gray-400 flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-purple-300" />
                    <span className="font-medium">
                      Due: {format(new Date(assignment.deadline), "PPP p")}
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-3 text-gray-300">
                    <BookOpen className="h-6 w-6 text-purple-300 flex-shrink-0 mt-1" />
                    <p className="text-lg leading-relaxed">
                      {assignment.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Right Column: Submission Form */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
            >
              <SubmissionForm onSubmit={handleSubmit} loading={submitting} />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </ProtectedRoute>
  );
}
