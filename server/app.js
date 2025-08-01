const express = require("express")
const cors = require("cors")
const authRoutes = require("./routes/authRoutes")
const assignmentRoutes = require("./routes/assignmentRoutes")
const submissionRoutes = require("./routes/submissionRoutes")

const app = express()

// Middleware
app.use(cors()) // Enable CORS for all origins
app.use(express.json()) // Body parser for JSON data

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/assignments", assignmentRoutes)
app.use("/api/submissions", submissionRoutes)

// Basic route for testing
app.get("/", (req, res) => {
  res.send("Assignment Submission Portal Backend API")
})

module.exports = app
