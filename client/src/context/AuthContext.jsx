"use client"

import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import api from "../lib/api.js"
import { jwtDecode } from "jwt-decode"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const loadUserFromLocalStorage = useCallback(() => {
    try {
      const token = localStorage.getItem("token")
      if (token) {
        const decoded = jwtDecode(token)
        // Basic check for token expiration (optional, backend handles full validation)
        if (decoded.exp * 1000 > Date.now()) {
          setUser({ id: decoded.id, email: decoded.email, role: decoded.role })
        } else {
          localStorage.removeItem("token")
          setUser(null)
        }
      }
    } catch (error) {
      console.error("Failed to decode token or load user:", error)
      localStorage.removeItem("token")
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadUserFromLocalStorage()
  }, [loadUserFromLocalStorage])

  const login = async (email, password) => {
    try {
      const data = await api("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      })
      localStorage.setItem("token", data.token)
      setUser({ id: data._id, email: data.email, role: data.role })
      router.push("/dashboard")
      return { success: true }
    } catch (error) {
      return { success: false, message: error.message }
    }
  }

  const register = async (email, password, role) => {
    try {
      const data = await api("/auth/register", {
        method: "POST",
        body: JSON.stringify({ email, password, role }),
      })
      localStorage.setItem("token", data.token)
      setUser({ id: data._id, email: data.email, role: data.role })
      router.push("/dashboard")
      return { success: true }
    } catch (error) {
      return { success: false, message: error.message }
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
    router.push("/login")
  }

  return <AuthContext.Provider value={{ user, loading, login, register, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
