"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../../context/AuthContext.jsx"
import LoadingSpinner from "./LoadingSpinner.jsx"
// import LoadingSpinner from "./LoadingSpinner.jsx"

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login")
      } else if (allowedRoles && !allowedRoles.includes(user.role)) {
        // Redirect to dashboard or a forbidden page if role not allowed
        router.push("/dashboard")
      }
    }
  }, [user, loading, router, allowedRoles])

  if (loading || (!user && !loading) || (allowedRoles && !allowedRoles.includes(user?.role))) {
    return <LoadingSpinner />
  }

  return children
}
