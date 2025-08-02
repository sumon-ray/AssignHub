"use client"

import { useEffect, useState } from "react"
import api from "../../../lib/api"
import LoadingSpinner from "../../../components/common/LoadingSpinner.jsx"
import SubmissionCard from "../../../components/submissions/SubmissionCard.jsx"
import { useAuth } from "../../../context/AuthContext"
import { USER_ROLES } from "../../../lib/constants.js"
import { motion } from "framer-motion"

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { user } = useAuth()

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setLoading(true)
        let data
        if (user.role === USER_ROLES.STUDENT) {
          data = await api("/submissions/me")
        } else if (user.role === USER_ROLES.INSTRUCTOR) {
          setError(
            "Instructors should view submissions from the 'Assignments' page by clicking 'View Submissions' on a specific assignment.",
          )
          setLoading(false)
          return
        }
        setSubmissions(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    if (user) {
      fetchSubmissions()
    }
  }, [user])

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
    <div className="p-4">
      <h1 className="text-4xl md:text-5xl font-extrabold  drop-shadow-lg mb-8 text-center">
        {user.role === USER_ROLES.STUDENT ? "My Submissions" : "Submissions Overview (Instructor)"}
      </h1>

      {user.role === USER_ROLES.INSTRUCTOR && (
        <div className="text-center text-gray-400 text-xl mt-16 mb-8 p-8 bg-gray-800 rounded-xl shadow-inner border border-purple-800">
          Instructors: Please navigate to the "Assignments" page and click "View Submissions" on a specific assignment
          to review student work.
        </div>
      )}

      {user.role === USER_ROLES.STUDENT && submissions.length === 0 ? (
        <div className="text-center text-gray-400 text-xl mt-16 p-8 bg-gray-800 rounded-xl shadow-inner border border-purple-800">
          You have not submitted any assignments yet.
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {user.role === USER_ROLES.STUDENT &&
            submissions.map((submission) => (
              <motion.div key={submission._id} variants={itemVariants}>
                <SubmissionCard submission={submission} userRole={user?.role} />
              </motion.div>
            ))}
        </motion.div>
      )}
    </div>
  )
}
