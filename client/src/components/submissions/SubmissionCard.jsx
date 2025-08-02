import { format } from "date-fns";
import {
  CheckCircle,
  Clock,
  ExternalLink,
  MessageSquare,
  User,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { USER_ROLES } from "../../lib/constants.js";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function SubmissionCard({ submission, userRole }) {
  const isInstructor = userRole === USER_ROLES.INSTRUCTOR;

  const getStatusInfo = (status) => {
    switch (status) {
      case "Accepted":
        return { color: "bg-green-600", icon: CheckCircle, text: "Accepted" };
      case "Rejected":
        return { color: "bg-red-600", icon: XCircle, text: "Rejected" };
      case "Pending":
      default:
        return { color: "bg-yellow-600", icon: Clock, text: "Pending" };
    }
  };

  const {
    color,
    icon: StatusIcon,
    text: statusText,
  } = getStatusInfo(submission.status);

  return (
    <Card className="bg-gray-800 text-white shadow-xl hover:shadow-2xl transition-all duration-300 border border-purple-700 hover:border-purple-500 transform hover:-translate-y-1">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 hover:from-blue-300  mb-2">
          {submission.assignment
            ? submission.assignment.title
            : "Unknown Assignment"}
        </CardTitle>
        <CardDescription className="text-gray-400 flex items-center gap-2">
          <User className="h-4 w-4 " />
          <span className="font-medium ">
            Submitted by:{" "}
            {submission.student ? submission.student.email : "Unknown Student"}
          </span>
        </CardDescription>
        <CardDescription className="text-gray-400 text-sm mt-1">
          On: {format(new Date(submission.createdAt), "PPP p")}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between border-b border-gray-700 pb-4">
          <div className="flex items-center gap-2">
            <StatusIcon
              className={`h-5 w-5 ${color.replace("bg-", "text-")}`}
            />
            <Badge
              className={`${color} text-white text-base px-3 py-1 rounded-full`}
            >
              {statusText}
            </Badge>
          </div>

          <Button>
            <a
              href={submission.submissionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline   from-blue-400 to-purple-600  flex items-center gap-1  hover:text-purple-300"
            >
              View Submission <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
        {submission.note && (
          <div className="bg-gray-700 p-4 rounded-lg shadow-inner border border-gray-600">
            <p className="font-semibold text-gray-300 flex items-center gap-2 mb-2">
              <MessageSquare className="h-5 w-5 text-purple-300" /> Student
              Note:
            </p>
            <p className="text-gray-400 italic leading-relaxed">
              {submission.note}
            </p>
          </div>
        )}
        {submission.feedback && (
          <div className="bg-gray-700 p-4 rounded-lg shadow-inner border border-gray-600">
            <p className="font-semibold text-gray-300 flex items-center gap-2 mb-2">
              <MessageSquare className="h-5 w-5 text-purple-300" /> Instructor
              Feedback:
            </p>
            <p className="text-gray-400 leading-relaxed">
              {submission.feedback}
            </p>
          </div>
        )}
        {isInstructor && (
          <div className="flex justify-end pt-4">
            <Link href={`/dashboard/submissions/${submission._id}`}>
              <Button className="    px-6 py-3 shadow-md hover:shadow-lg transition-all duration-300">
                Review Submission
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
