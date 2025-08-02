"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import api from "../../../../../lib/api"
import LoadingSpinner from "../../../../../components/common/LoadingSpinner.jsx"
import SubmissionCard from "../../../../../components/submissions/SubmissionCard.jsx"
import ProtectedRoute from "../../../../../components/common/ProtectedRoute.jsx"
import { USER_ROLES } from "../../../../../lib/constants.js"
import { motion } from "framer-motion"

export default function AssignmentSubmissionsPage() {
  const { id } = useParams()
  const [assignment, setAssignment] = useState(null)
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchAssignmentAndSubmissions = async () => {
      try {
        setLoading(true)
        const assignmentData = await api(`/assignments/${id}`)
        setAssignment(assignmentData)

        const submissionsData = await api(`/assignments/${id}/submissions`)
        setSubmissions(submissionsData)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    if (id) {
      fetchAssignmentAndSubmissions()
    }
  }, [id])

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <ProtectedRoute allowedRoles={[USER_ROLES.INSTRUCTOR]}>
      <div className="p-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 drop-shadow-lg mb-4 text-center">
          Submissions for: {assignment.title}
        </h1>
        <p className="text-center text-gray-400 mb-8 text-lg">{assignment.description}</p>

        {submissions.length === 0 ? (
          <div className="text-center text-gray-400 text-xl mt-16 p-8 bg-gray-800 rounded-xl shadow-inner border border-purple-800">
            No submissions for this assignment yet.
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {submissions.map((submission) => (
              <motion.div key={submission._id} variants={itemVariants}>
                <SubmissionCard submission={submission} userRole={USER_ROLES.INSTRUCTOR} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </ProtectedRoute>
  )
}
