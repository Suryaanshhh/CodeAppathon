const { Task, User } = require('../models/index');

// Create Task (Managers/Admins only)
exports.createTask = async (req, res) => {
  try {
    const { title, description, assignedTo, priority, deadline } = req.body;
    
    const task = await Task.create({
      title,
      description,
      assignedTo,
      priority,
      deadline,
      assignedBy: req.user.id // From JWT
    });

    res.status(201).json({ success: true, data: task });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update Task Status (Volunteer or Manager)
exports.updateTaskStatus = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;

    const task = await Task.findByPk(taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });

    // Ensure volunteers can only update tasks assigned to them
    if (req.user.role === 'Volunteer' && task.assignedTo !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to update this task" });
    }

    await task.update({ status });
    res.json({ success: true, message: "Task status updated", data: task });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get My Tasks (For Volunteers)
exports.getMyTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({ where: { assignedTo: req.user.id } });
    res.json({ success: true, data: tasks });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};