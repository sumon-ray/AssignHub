"use client";

import { format } from "date-fns";
import { useState } from "react";
import { SUBMISSION_STATUSES } from "../../lib/constants.js";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

export default function SubmissionReview({ submission, onSubmit, loading }) {
  const [status, setStatus] = useState(submission.status);
  const [feedback, setFeedback] = useState(submission.feedback || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ status, feedback });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-gray-800 text-white shadow-lg border-purple-500 border-opacity-30">
      <CardHeader>
        <CardTitle className="  text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          Review Submission
        </CardTitle>
        <CardDescription className="text-gray-400">
          Assignment:{" "}
          <span className="font-medium">
            {submission.assignment ? submission.assignment.title : "N/A"}
          </span>
          <br />
          Student:{" "}
          <span className="font-medium">
            {submission.student ? submission.student.email : "N/A"}
          </span>
          <br />
          Submitted on: {format(new Date(submission.createdAt), "PPP p")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6 space-y-2">
          <p className="font-semibold text-gray-300">Submission URL:</p>
          <a
            href={submission.submissionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:underline break-all"
          >
            {submission.submissionUrl}
          </a>
        </div>
        {submission.note && (
          <div className="mb-6 space-y-2">
            <p className="font-semibold text-gray-300">Student Note:</p>
            <p className="text-gray-400 italic p-3 bg-gray-700 rounded-lg">
              {submission.note}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label
              htmlFor="status"
              className="text-lg font-semibold text-gray-300"
            >
              Update Status
            </Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-full mt-2 p-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-gray-700 text-white">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 text-white border border-gray-600">
                <SelectItem value={SUBMISSION_STATUSES.PENDING}>
                  Pending
                </SelectItem>
                <SelectItem value={SUBMISSION_STATUSES.ACCEPTED}>
                  Accepted
                </SelectItem>
                <SelectItem value={SUBMISSION_STATUSES.REJECTED}>
                  Rejected
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label
              htmlFor="feedback"
              className="text-lg font-semibold text-gray-300"
            >
              Feedback
            </Label>
            <Textarea
              id="feedback"
              placeholder="Provide feedback to the student..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows="6"
              className="mt-2 p-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-gray-700 text-white"
            />
          </div>
          <Button
            type="submit"
            className="mx-auto text-center flex flex-col"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Submission"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
