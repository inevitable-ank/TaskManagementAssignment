// server/routes/taskRoutes.js
const express = require("express");
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Protected routes
router.use(authMiddleware);

// Task management routes
router.post("/", createTask); // Create a new task
router.get("/", getTasks); // Get all tasks (with pagination)
router.get("/:id", getTaskById); // Get task details by ID
router.put("/:id", updateTask); // Update a task
router.delete("/:id", deleteTask); // Delete a task

module.exports = router;
