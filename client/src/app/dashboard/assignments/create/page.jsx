"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import AssignmentForm from "../../../../components/assignments/AssignmentForm.jsx"
import api from "../../../../lib/api"
import ProtectedRoute from "../../../../components/common/ProtectedRoute.jsx"
import { USER_ROLES } from "../../../../lib/constants.js"
import { motion } from "framer-motion"

export default function CreateAssignmentPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const handleCreateAssignment = async (formData) => {
    setLoading(true)
    setError(null)
    setSuccess(false)
    try {
      await api("/assignments", {
        method: "POST",
        body: JSON.stringify(formData),
      })
      setSuccess(true)
      router.push("/dashboard/assignments") // Redirect to assignments list
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  }

  return (
    <ProtectedRoute allowedRoles={[USER_ROLES.INSTRUCTOR]}>
      <div className="p-4">
        {/* <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 drop-shadow-lg mb-8 text-center">
          Create New Assignment
        </h1> */}
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
            Assignment created successfully!
          </motion.div>
        )}
        <motion.div variants={formVariants} initial="hidden" animate="visible">
          <AssignmentForm onSubmit={handleCreateAssignment} loading={loading} />
        </motion.div>
      </div>
    </ProtectedRoute>
  )
}
