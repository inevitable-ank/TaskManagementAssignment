// server/Controllers/taskController.js
const Task = require("../models/Task");

// Create a new task
const createTask = async (req, res) => {
  try {
    console.log("Create Task Request Body:", req.body); // Debugging log
    console.log("User ID from Middleware:", req.user?.id);
    const { title, description, dueDate, priority } = req.body;

    if (!title || !dueDate || !priority) {
      return res.status(400).json({ message: "Title, due date, and priority are required" });
    }
    console.log("Priority Received:", priority);

    const task = await Task.create({
      title,
      description,
      dueDate,
      priority: priority.toLowerCase(),
      status: "pending",
      user: req.user.id, // Associate the task with the logged-in user
    });

    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all tasks for the authenticated user
const getTasks = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const tasks = await Task.find({ user: req.user.id })
      .sort({ dueDate: 1 }) // Sort by due date
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Task.countDocuments({ user: req.user.id });

    res.status(200).json({
      tasks,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit),
      totalTasks: total,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get a single task by ID
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task || task.user.toString() !== req.user.id) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update a task
const updateTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority, status } = req.body;

    console.log("Request Params:", req.params); // Debug task ID
    console.log("Request Body:", req.body); 
    const task = await Task.findById(req.params.id);

    if (!task || task.user.toString() !== req.user.id) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.dueDate = dueDate || task.dueDate;
    task.priority = priority || task.priority;
    task.status = status || task.status;

    const updatedTask = await task.save();
    console.log("Updated Task:", updatedTask);
    res.status(200).json({ message: "Task updated successfully", task: updatedTask });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
    try {
      console.log("Request Params (Task ID):", req.params.id); // Log Task ID
      const task = await Task.findById(req.params.id);
  
      if (!task) {
        console.error("Task not found in database."); // Log if task is missing
        return res.status(404).json({ message: "Task not found" });
      }
  
      if (task.user.toString() !== req.user.id) {
        console.error("User ID mismatch. Cannot delete this task."); // Log if user mismatch
        return res.status(403).json({ message: "Unauthorized to delete this task" });
      }
  
      console.log("Deleting Task:", task); // Log the task being deleted
      await task.deleteOne();
      res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
      console.error("Error in deleteTask:", error.message || error); // Log the exact error
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
