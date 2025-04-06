const Task = require("../models/Task");

// Create a new task
const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    const newTask = new Task({
      title,
      description,
      user: req.user.id, // requires auth middleware
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(500).json({ message: "Server error while creating task" });
  }
};

// Get all tasks for a user
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Server error while getting tasks" });
  }
};

// Update task
const updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!updatedTask) return res.status(404).json({ message: "Task not found" });

    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: "Server error while updating task" });
  }
};

// Delete task
const deleteTask = async (req, res) => {
  try {
    const deleted = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!deleted) return res.status(404).json({ message: "Task not found" });

    res.status(200).json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error while deleting task" });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};
