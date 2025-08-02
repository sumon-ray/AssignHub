export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://assignhub-server.vercel.app/api"

export const USER_ROLES = {
  INSTRUCTOR: "instructor",
  STUDENT: "student",
}

export const SUBMISSION_STATUSES = {
  PENDING: "Pending",
  ACCEPTED: "Accepted",
  REJECTED: "Rejected",
}
