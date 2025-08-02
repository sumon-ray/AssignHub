"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import SubmissionForm from "../../../../../components/assignments/SubmissionForm.jsx"
import api from "../../../../../lib/api"
import LoadingSpinner from "../../../../../components/common/LoadingSpinner.jsx"
import ProtectedRoute from "../../../../../components/common/ProtectedRoute.jsx"
import { USER_ROLES } from "../../../../../lib/constants.js"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../../../../components/ui/card"
import { format } from "date-fns"
import { motion } from "framer-motion"
import { Calendar, BookOpen } from "lucide-react"

export default function SubmitAssignmentPage() {
  const { id } = useParams()
  const router = useRouter()
  const [assignment, setAssignment] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        setLoading(true)
        const data = await api(`/assignments/${id}`)
        setAssignment(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    if (id) {
      fetchAssignment()
    }
  }, [id])

  const handleSubmit = async (formData) => {
    setSubmitting(true)
    setError(null)
    setSuccess(false)
    try {
      await api(`/assignments/${id}/submit`, {
        method: "POST",
        body: JSON.stringify(formData),
      })
      setSuccess(true)
      router.push("/dashboard/submissions") // Redirect to my submissions
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  if (error) {
    return (
      <div className="text-red-400 text-center mt-8 p-4 bg-red-900 bg-opacity-30 rounded-lg shadow-md">
        Error: {error}
      </div>
    )
  }

  if (!assignment) {
    return <div className="text-center text-gray-400 mt-8">Assignment not found.</div>
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  }

  return (
    <ProtectedRoute allowedRoles={[USER_ROLES.STUDENT]}>
      <div className="p-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 drop-shadow-lg mb-8 text-center">
          Submit for Assignment
        </h1>
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-2xl mx-auto mb-8 bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-xl shadow-2xl border border-purple-700 backdrop-blur-sm bg-opacity-80"
        >
          <Card className="bg-transparent border-none shadow-none">
            <CardHeader className="pb-4">
              <CardTitle className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-2">
                {assignment.title}
              </CardTitle>
              <CardDescription className="text-gray-400 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-purple-300" />
                <span className="font-medium">Due: {format(new Date(assignment.deadline), "PPP p")}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-2 text-gray-300">
                <BookOpen className="h-5 w-5 text-purple-300 flex-shrink-0 mt-1" />
                <p className="text-lg leading-relaxed">{assignment.description}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-400 text-center mb-4 p-3 bg-red-900 bg-opacity-30 rounded-md shadow-md"
          >
            {error}
          </motion.div>
        )}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-green-400 text-center mb-4 p-3 bg-green-900 bg-opacity-30 rounded-md shadow-md"
          >
            Submission successful!
          </motion.div>
        )}
        <motion.div variants={cardVariants} initial="hidden" animate="visible">
          <SubmissionForm onSubmit={handleSubmit} loading={submitting} />
        </motion.div>
      </div>
    </ProtectedRoute>
  )
}
