"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import SubmissionReview from "../../../../components/submissions/SubmissionReview.jsx"
import api from "../../../../lib/api"
import LoadingSpinner from "../../../../components/common/LoadingSpinner.jsx"
import ProtectedRoute from "../../../../components/common/ProtectedRoute.jsx"
import { USER_ROLES } from "../../../../lib/constants.js"
import { motion } from "framer-motion"

export default function ReviewSubmissionPage() {
  const { id } = useParams()
  const router = useRouter()
  const [submission, setSubmission] = useState(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        setLoading(true)
        // Fetch submission details, including populated assignment and student
        const data = await api(`/submissions/${id}`) // Assuming backend has an endpoint for single submission by ID
        setSubmission(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    if (id) {
      fetchSubmission()
    }
  }, [id])

  const handleUpdateSubmission = async (formData) => {
    setUpdating(true)
    setError(null)
    setSuccess(false)
    try {
      const updatedData = await api(`/submissions/${id}`, {
        method: "PUT",
        body: JSON.stringify(formData),
      })
      setSubmission(updatedData) // Update local state with new data
      setSuccess(true)
      // Optionally, redirect back to the assignment's submissions list
      // router.push(`/dashboard/assignments/${submission.assignment._id}/submissions`);
    } catch (err) {
      setError(err.message)
    } finally {
      setUpdating(false)
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

  if (!submission) {
    return <div className="text-center text-gray-400 mt-8">Submission not found.</div>
  }

  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  }

  return (
    <ProtectedRoute allowedRoles={[USER_ROLES.INSTRUCTOR]}>
      <div className="p-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 drop-shadow-lg mb-8 text-center">
          Review Submission
        </h1>
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
            Submission updated successfully!
          </motion.div>
        )}
        <motion.div variants={formVariants} initial="hidden" animate="visible">
          <SubmissionReview submission={submission} onSubmit={handleUpdateSubmission} loading={updating} />
        </motion.div>
      </div>
    </ProtectedRoute>
  )
}
