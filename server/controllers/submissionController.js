const Submission = require("../models/Submission");
const Assignment = require("../models/Assignment");

// @desc    Submit an assignment
// @route   POST /api/assignments/:assignmentId/submit
// @access  Private/Student
const submitAssignment = async (req, res) => {
  const { submissionUrl, note } = req.body;
  const { assignmentId } = req.params;

  if (!submissionUrl) {
    return res.status(400).json({ message: "Submission URL is required" });
  }

  try {
    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    // Check if student has already submitted
    const existingSubmission = await Submission.findOne({
      assignment: assignmentId,
      student: req.user._id,
    });

    if (existingSubmission) {
      return res
        .status(400)
        .json({ message: "You have already submitted for this assignment." });
    }

    const submission = await Submission.create({
      assignment: assignmentId,
      student: req.user._id,
      submissionUrl,
      note,
      status: "Pending", // Default status
    });

    res.status(201).json(submission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all submissions by the authenticated student
// @route   GET /api/submissions/me
// @access  Private/Student
const getMySubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({ student: req.user._id })
      .populate("assignment", "title deadline instructor")
      .populate("student", "email");

    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update submission status and add feedback (Instructor only)
// @route   PUT /api/submissions/:id
// @access  Private/Instructor
const updateSubmissionStatus = async (req, res) => {
  const { status, feedback } = req.body;

  try {
    const submission = await Submission.findById(req.params.id).populate(
      "assignment"
    );

    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    // Ensure instructor is authorized
    if (
      submission.assignment.instructor.toString() !== req.user._id.toString()
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this submission" });
    }

    if (status) submission.status = status;
    if (feedback !== undefined) submission.feedback = feedback;

    const updatedSubmission = await submission.save();
    res.json(updatedSubmission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get submission status counts for pie chart (Instructor only)
// @route   GET /api/submissions/status-counts
// @access  Private/Instructor
const getSubmissionStatusCounts = async (req, res) => {
  try {
    const instructorAssignments = await Assignment.find({
      instructor: req.user._id,
    }).select("_id");

    const assignmentIds = instructorAssignments.map((a) => a._id);

    const counts = await Submission.aggregate([
      {
        $match: {
          assignment: { $in: assignmentIds },
        },
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          status: "$_id",
          count: 1,
        },
      },
    ]);

    // Initialize with 0
    const statusCounts = {
      Pending: 0,
      Accepted: 0,
      Rejected: 0,
    };

    // Update actual counts
    counts.forEach((item) => {
      statusCounts[item.status] = item.count;
    });

    res.json(statusCounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  submitAssignment,
  getMySubmissions,
  updateSubmissionStatus,
  getSubmissionStatusCounts,
};
