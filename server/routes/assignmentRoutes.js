const express = require("express");
const {
  createAssignment,
  getAssignments,
  getAssignmentById,
  getSubmissionsForAssignment,
} = require("../controllers/assignmentController");

const { submitAssignment } = require("../controllers/submissionController");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

const router = express.Router();

// ---------------- Instructor Routes ---------------- //

// Create a new assignment (only instructor)
router.post(
  "/",
  protect,
  authorizeRoles("instructor"),
  createAssignment
);

// View submissions for a specific assignment (only instructor)
router.get(
  "/:assignmentId/submissions",
  protect,
  authorizeRoles("instructor"),
  getSubmissionsForAssignment
);

// ---------------- Common Authenticated Routes ---------------- //

// Get all assignments (any authenticated user)
router.get("/", protect, getAssignments);

// Get a specific assignment by ID
router.get("/:id", protect, getAssignmentById);

// ---------------- Student Routes ---------------- //

// Submit an assignment (only student)
router.post(
  "/:assignmentId/submit",
  protect,
  authorizeRoles("student"),
  submitAssignment
);

module.exports = router;
