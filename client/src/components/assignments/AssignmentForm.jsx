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
    hover: { scale: 1.02, boxShadow: "0px 8px 20px rgba(var(--primary), 0.6)" },
    tap: { scale: 0.98 },
  }

  return (
    <Card className="w-full max-w-2xl mx-auto bg-card  rounded-xl shadow-glow-lg border border-border backdrop-blur-sm bg-opacity-80">
      <CardHeader className="pb-4">
        <CardTitle className="text-3xl text-center md:text-4xl font-bold  bg-clip-text  drop-shadow-md">
          Assignment Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="title" className="text-lg font-semibold text-foreground/90">
              Title
            </Label>
            <Input
              id="title"
              type="text"
              placeholder="e.g., Introduction to React"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="mt-2 p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-input text-foreground placeholder-muted-foreground transition-all duration-200 shadow-inner-glow"
            />
          </div>
          <div>
            <Label htmlFor="description" className="text-lg font-semibold text-foreground/90">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Provide a detailed description of the assignment requirements."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="6"
              required
              className="mt-2 p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-input text-foreground placeholder-muted-foreground transition-all duration-200 shadow-inner-glow"
            />
          </div>
          <div>
            <Label htmlFor="deadline" className="text-lg font-semibold ">
              Deadline
            </Label>
            <Input
              id="deadline"
              type="datetime-local"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              required
              className="mt-2 p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-input text-foreground placeholder-muted-foreground transition-all duration-200 shadow-inner-glow"
            />
          </div>
          <motion.div  whileTap="tap" variants={buttonVariants}>
            <Button
              type="submit"
              className="mx-auto w-full text-md "
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
