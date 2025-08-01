const Assignment = require("../models/Assignment")
const Submission = require("../models/Submission")

// @desc    Create a new assignment
// @route   POST /api/assignments
// @access  Private/Instructor
const createAssignment = async (req, res) => {
  const { title, description, deadline } = req.body

  if (!title || !description || !deadline) {
    return res.status(400).json({ message: "Please enter all fields" })
  }

  try {
    const assignment = await Assignment.create({
      title,
      description,
      deadline,
      instructor: req.user._id, // Instructor ID from authenticated user
    })
    res.status(201).json(assignment)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Get all assignments (for all users)
// @route   GET /api/assignments
// @access  Private
const getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find({}).populate("instructor", "email")
    res.json(assignments)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Get a single assignment by ID
// @route   GET /api/assignments/:id
// @access  Private
const getAssignmentById = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id).populate("instructor", "email")
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" })
    }
    res.json(assignment)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Get all submissions for a specific assignment (Instructor only)
// @route   GET /api/assignments/:assignmentId/submissions
// @access  Private/Instructor
const getSubmissionsForAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.assignmentId)
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" })
    }

    // Ensure the instructor requesting is the one who created the assignment
    if (assignment.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to view submissions for this assignment" })
    }

    const submissions = await Submission.find({ assignment: req.params.assignmentId })
      .populate("student", "email")
      .populate("assignment", "title")
    res.json(submissions)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  createAssignment,
  getAssignments,
  getAssignmentById,
  getSubmissionsForAssignment,
}
