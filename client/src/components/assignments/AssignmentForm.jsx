"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Loader2, PlusCircle } from "lucide-react"
import { motion } from "framer-motion"

export default function AssignmentForm({ onSubmit, loading }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [deadline, setDeadline] = useState("") // YYYY-MM-DDTHH:MM format for datetime-local

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ title, description, deadline })
  }

  const buttonVariants = {
    hover: { scale: 1.02, boxShadow: "0px 8px 20px rgba(139, 92, 246, 0.6)" },
    tap: { scale: 0.98 },
  }

  return (
    <Card className="w-full max-w-2xl mx-auto bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-xl shadow-2xl border border-purple-700 backdrop-blur-sm bg-opacity-80">
      <CardHeader className="pb-4">
        <CardTitle className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 drop-shadow-md">
          Assignment Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="title" className="text-lg font-semibold text-gray-200">
              Title
            </Label>
            <Input
              id="title"
              type="text"
              placeholder="e.g., Introduction to React"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="mt-2 p-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-gray-700 text-white placeholder-gray-400 transition-all duration-200 shadow-inner"
            />
          </div>
          <div>
            <Label htmlFor="description" className="text-lg font-semibold text-gray-200">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Provide a detailed description of the assignment requirements."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="6"
              required
              className="mt-2 p-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-gray-700 text-white placeholder-gray-400 transition-all duration-200 shadow-inner"
            />
          </div>
          <div>
            <Label htmlFor="deadline" className="text-lg font-semibold text-gray-200">
              Deadline
            </Label>
            <Input
              id="deadline"
              type="datetime-local"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              required
              className="mt-2 p-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-gray-700 text-white placeholder-gray-400 transition-all duration-200 shadow-inner"
            />
          </div>
          <motion.div whileHover="hover" whileTap="tap" variants={buttonVariants}>
            <Button
              type="submit"
              className="w-full py-3 text-lg font-bold bg-gradient-to-r from-purple-600 to-indigo-700 text-white rounded-lg shadow-lg hover:from-purple-700 hover:to-indigo-800 transition-all duration-300 flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" /> Creating...
                </>
              ) : (
                <>
                  Create Assignment <PlusCircle className="h-5 w-5" />
                </>
              )}
            </Button>
          </motion.div>
        </form>
      </CardContent>
    </Card>
  )
}
