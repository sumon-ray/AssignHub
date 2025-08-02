"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

export default function SubmissionForm({ onSubmit, loading }) {
  const [submissionUrl, setSubmissionUrl] = useState("")
  const [note, setNote] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ submissionUrl, note })
  }

  return (
    <Card className="w-full max-w-xl mx-auto bg-gray-800 text-white shadow-lg border-purple-500 border-opacity-30">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-purple-400">Submit Your Work</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="submissionUrl" className="text-lg font-semibold text-gray-300">
              Submission URL
            </Label>
            <Input
              id="submissionUrl"
              type="url"
              placeholder="e.g., https://github.com/your-repo"
              value={submissionUrl}
              onChange={(e) => setSubmissionUrl(e.target.value)}
              required
              className="mt-2 p-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-gray-700 text-white"
            />
          </div>
          <div>
            <Label htmlFor="note" className="text-lg font-semibold text-gray-300">
              Notes (Optional)
            </Label>
            <Textarea
              id="note"
              placeholder="Any additional notes for the instructor..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows="4"
              className="mt-2 p-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-gray-700 text-white"
            />
          </div>
          <Button
            type="submit"
            className="w-full py-3 text-lg font-bold bg-purple-600 hover:bg-purple-700 transition-colors duration-300 rounded-lg"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Assignment"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
