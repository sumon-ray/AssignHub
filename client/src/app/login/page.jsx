"use client"

import { useState } from "react"
import AuthForm from "../../components/common/AuthForm.jsx"
import { useAuth } from "../../context/AuthContext"
import Link from "next/link"
import Navbar from "../../components/common/Navbar.jsx"
import Footer from "../../components/common/Footer.jsx"

export default function LoginPage() {
  const { login } = useAuth()
  const [errorMessage, setErrorMessage] = useState("")

  const handleLogin = async (email, password) => {
    setErrorMessage("")
    const result = await login(email, password)
    if (!result.success) {
      setErrorMessage(result.message || "Login failed. Please check your credentials.")
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
      <Navbar />
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <AuthForm type="login" onSubmit={handleLogin} errorMessage={errorMessage} />
          <p className="text-center mt-6 text-gray-400 text-lg">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-purple-400 hover:text-purple-300 transition-colors font-semibold underline-offset-4 hover:underline"
            >
              Register here
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
