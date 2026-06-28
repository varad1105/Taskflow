const Task = require('../models/Task');
const asyncHandler = require('../utils/asyncHandler');

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Public
const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find().sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    count: tasks.length,
    data: tasks,
  });
});

// @desc    Get single task
// @route   GET /api/tasks/:id
// @access  Public
const getTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({
      success: false,
      error: 'Task not found',
    });
  }

  res.status(200).json({
    success: true,
    data: task,
  });
});

// @desc    Create new task
// @route   POST /api/tasks
// @access  Public
const createTask = asyncHandler(async (req, res) => {
  const { title, description, priority, status, category, dueDate } = req.body;

  // Validation
  if (!title || !description || !priority || !status || !category || !dueDate) {
    return res.status(400).json({
      success: false,
      error: 'Please provide all required fields',
    });
  }

  const task = await Task.create({
    title,
    description,
    priority,
    status,
    category,
    dueDate,
  });

  res.status(201).json({
    success: true,
    data: task,
  });
});

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Public
const updateTask = asyncHandler(async (req, res) => {
  const { title, description, priority, status, category, dueDate } = req.body;

  let task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({
      success: false,
      error: 'Task not found',
    });
  }

  task = await Task.findByIdAndUpdate(
    req.params.id,
    { title, description, priority, status, category, dueDate },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    data: task,
  });
});

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Public
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({
      success: false,
      error: 'Task not found',
    });
  }

  await task.deleteOne();

  res.status(200).json({
    success: true,
    data: {},
  });
});

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
