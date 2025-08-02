"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button" // shadcn/ui Button
import { Input } from "@/components/ui/input" // shadcn/ui Input
import { Label } from "@/components/ui/label" // shadcn/ui Label
import { Textarea } from "@/components/ui/textarea" // shadcn/ui Textarea
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card" // shadcn/ui Card
import { Loader2 } from "lucide-react" // For loading spinner inside button

export default function SubmissionForm({ onSubmit, loading }) {
  const [submissionUrl, setSubmissionUrl] = useState("")
  const [note, setNote] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ submissionUrl, note })
  }

  return (
    <Card className="w-full max-w-2xl mx-auto bg-gray-800/70 text-white shadow-2xl border border-gray-700 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          Submit Your Work
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="submissionUrl" className="text-lg font-semibold text-gray-200 mb-2 block">
              Submission URL
            </Label>
            <Input
              id="submissionUrl"
              type="url"
              placeholder="e.g., https://github.com/your-repo"
              value={submissionUrl}
              onChange={(e) => setSubmissionUrl(e.target.value)}
              required
              className="p-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white placeholder:text-gray-400 transition-colors duration-200"
            />
          </div>
          <div>
            <Label htmlFor="note" className="text-lg font-semibold text-gray-200 mb-2 block">
              Notes (Optional)
            </Label>
            <Textarea
              id="note"
              placeholder="Any additional notes for the instructor..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows="5"
              className="p-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white placeholder:text-gray-400 transition-colors duration-200 resize-y"
            />
          </div>
          <Button
            type="submit"
            className="w-full py-3 text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white transition-all duration-300 rounded-lg shadow-md flex items-center justify-center gap-2"
            disabled={loading}
          >
            {loading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
            {loading ? "Submitting..." : "Submit Assignment"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
