"use client"

import { useEffect, useState } from "react"
import api from "../../../lib/api"
import LoadingSpinner from "../../../components/common/LoadingSpinner.jsx"
import SubmissionPieChart from "../../../components/analytics/SubmissionPieChart.jsx"
import ProtectedRoute from "../../../components/common/ProtectedRoute.jsx"
import { USER_ROLES } from "../../../lib/constants.js"
import { motion } from "framer-motion"

export default function AnalyticsPage() {
  const [statusCounts, setStatusCounts] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchStatusCounts = async () => {
      try {
        setLoading(true)
        const data = await api("/submissions/status-counts")
        setStatusCounts(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchStatusCounts()
  }, [])

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

  const chartVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
  }

  return (
    <ProtectedRoute allowedRoles={[USER_ROLES.INSTRUCTOR]}>
      <div className="p-4">
        <h1 className="text-4xl md:text-5xl font-extrabold  drop-shadow-lg mb-8 text-center">
          Submission Analytics
        </h1>
        {statusCounts ? (
          <motion.div variants={chartVariants} initial="hidden" animate="visible">
            <SubmissionPieChart data={statusCounts} />
          </motion.div>
        ) : (
          <div className="text-center text-gray-400 text-xl mt-16 p-8 bg-gray-800 rounded-xl shadow-inner border border-purple-800">
            No analytics data available.
          </div>
        )}
      </div>
    </ProtectedRoute>
  )
}
