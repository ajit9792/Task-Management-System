const express = require("express");
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
} = require("../controllers/taskController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create task
router.post("/", authMiddleware, createTask);

// Get all tasks (dashboard)
router.get("/", authMiddleware, getTasks);


router.get("/:id", authMiddleware, getTaskById);

// Update task
router.put("/:id", authMiddleware, updateTask);

// Delete task
router.delete("/:id", authMiddleware, deleteTask);

module.exports = router;
