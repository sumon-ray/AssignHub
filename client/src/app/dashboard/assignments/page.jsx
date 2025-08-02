"use client"

import { useEffect, useState } from "react"
import api from "../../../lib/api"
import LoadingSpinner from "../../../components/common/LoadingSpinner.jsx"
import AssignmentCard from "../../../components/assignments/AssignmentCard.jsx"
import { useAuth } from "../../../context/AuthContext"
import Link from "next/link"
import { USER_ROLES } from "../../../lib/constants.js"
import { motion } from "framer-motion"
import { PlusCircle } from "lucide-react"

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { user } = useAuth()

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        setLoading(true)
        const data = await api("/assignments")
        setAssignments(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchAssignments()
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
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 drop-shadow-lg">
          Assignments
        </h1>
        {user && user.role === USER_ROLES.INSTRUCTOR && (
          <Link href="/dashboard/assignments/create">
            <motion.button
              className="bg-gradient-to-r from-purple-700 to-indigo-800 hover:from-purple-800 hover:to-indigo-900 text-white text-lg px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <PlusCircle className="h-5 w-5" /> Create New Assignment
            </motion.button>
          </Link>
        )}
      </div>

      {assignments.length === 0 ? (
        <div className="text-center text-gray-400 text-xl mt-16 p-8 bg-gray-800 rounded-xl shadow-inner border border-purple-800">
          No assignments available yet.
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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
  )
}
