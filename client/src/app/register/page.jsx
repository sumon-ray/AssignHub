"use client"

import { useState } from "react"
import AuthForm from "../../components/common/AuthForm.jsx"
import { useAuth } from "../../context/AuthContext"
import Link from "next/link"
import Navbar from "../../components/common/Navbar.jsx"
import Footer from "../../components/common/Footer.jsx"

export default function RegisterPage() {
  const { register } = useAuth()
  const [errorMessage, setErrorMessage] = useState("")

  const handleRegister = async (email, password, role) => {
    setErrorMessage("")
    const result = await register(email, password, role)
    if (!result.success) {
      setErrorMessage(result.message || "Registration failed. Please try again.")
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
      <Navbar />
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <AuthForm type="register" onSubmit={handleRegister} errorMessage={errorMessage} />
          <p className="text-center mt-6 text-gray-400 text-lg">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-purple-400 hover:text-purple-300 transition-colors font-semibold underline-offset-4 hover:underline"
            >
              Login here
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
