const express = require("express")
const {
  getMySubmissions,
  updateSubmissionStatus,
  getSubmissionStatusCounts,
  submitAssignment,
} = require("../controllers/submissionController")
const { protect, authorizeRoles } = require("../middleware/authMiddleware")

const router = express.Router()

// Student routes
router.post("/assignment/:assignmentId/submit", protect, authorizeRoles("student"),submitAssignment)
router.get("/me", protect, authorizeRoles("student"), getMySubmissions)

// Instructor routes
router.put("/:id", protect, authorizeRoles("instructor"), updateSubmissionStatus)
router.get("/status-counts", protect, authorizeRoles("instructor"), getSubmissionStatusCounts)
module.exports = router
