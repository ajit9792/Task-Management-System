const Task = require("../models/Task");

// =======================
// CREATE TASK
// =======================
exports.createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority } = req.body;

    const task = await Task.create({
      title,
      description,
      dueDate,
      priority,
      assignedTo: req.user.id,
      createdBy: req.user.id
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =======================
// GET ALL TASKS (with pagination)
// Admin → all
// User → only assigned
// =======================
exports.getTasks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    let filter = {};
    if (req.user.role !== "admin") {
      filter.assignedTo = req.user.id;
    }

    const totalTasks = await Task.countDocuments(filter);

    const tasks = await Task.find(filter)
      .populate("assignedTo", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      totalTasks,
      currentPage: page,
      totalPages: Math.max(1, Math.ceil(totalTasks / limit)),
      tasks
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =======================
// GET TASK BY ID  ✅ (THIS WAS MISSING)
// =======================
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate(
      "assignedTo",
      "name email"
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Authorization check
    if (
      task.assignedTo._id.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
       return res.status(403).json({ message: "Access denied" });
    }


    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =======================
// UPDATE TASK
// =======================
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.dueDate = req.body.dueDate || task.dueDate;
    task.priority = req.body.priority || task.priority;
    task.status = req.body.status || task.status;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =======================
// DELETE TASK
// =======================
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await task.deleteOne();
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
