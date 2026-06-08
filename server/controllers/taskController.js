const Task = require('../models/Task');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

// CREATE TASK
exports.createTask = catchAsync(async (req, res, next) => {
  const { title, description, priority, dueDate } = req.body;

  // Validation
  if (!title || title.trim() === '') {
    return next(new AppError('Please provide a task title', 400));
  }

  const task = await Task.create({
    title: title.trim(),
    description: description || '',
    priority: priority || 'medium',
    dueDate: dueDate || null,
    userId: req.user._id
  });

  res.status(201).json({
    status: 'success',
    data: {
      task
    }
  });
});

// GET ALL TASKS FOR USER
exports.getAllTasks = catchAsync(async (req, res, next) => {
  const { completed, priority, sortBy } = req.query;

  // Build filter
  let filter = { userId: req.user._id };

  if (completed !== undefined) {
    filter.completed = completed === 'true';
  }

  if (priority) {
    filter.priority = priority;
  }

  // Build sort
  let sortOption = '-createdAt'; // Default: newest first
  if (sortBy === 'dueDate') {
    sortOption = 'dueDate';
  } else if (sortBy === 'priority') {
    sortOption = 'priority';
  }

  const tasks = await Task.find(filter).sort(sortOption);

  res.status(200).json({
    status: 'success',
    results: tasks.length,
    data: {
      tasks
    }
  });
});

// GET SINGLE TASK
exports.getTask = catchAsync(async (req, res, next) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return next(new AppError('Task not found', 404));
  }

  // Check ownership
  if (task.userId.toString() !== req.user._id.toString()) {
    return next(new AppError('You do not have permission to access this task', 403));
  }

  res.status(200).json({
    status: 'success',
    data: {
      task
    }
  });
});

// UPDATE TASK
exports.updateTask = catchAsync(async (req, res, next) => {
  const { title, description, completed, priority, dueDate } = req.body;

  let task = await Task.findById(req.params.id);

  if (!task) {
    return next(new AppError('Task not found', 404));
  }

  // Check ownership
  if (task.userId.toString() !== req.user._id.toString()) {
    return next(new AppError('You do not have permission to update this task', 403));
  }

  // Update fields
  if (title !== undefined) task.title = title.trim();
  if (description !== undefined) task.description = description;
  if (completed !== undefined) task.completed = completed;
  if (priority !== undefined) task.priority = priority;
  if (dueDate !== undefined) task.dueDate = dueDate;

  task = await task.save();

  res.status(200).json({
    status: 'success',
    data: {
      task
    }
  });
});

// DELETE TASK
exports.deleteTask = catchAsync(async (req, res, next) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return next(new AppError('Task not found', 404));
  }

  // Check ownership
  if (task.userId.toString() !== req.user._id.toString()) {
    return next(new AppError('You do not have permission to delete this task', 403));
  }

  await Task.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    data: null
  });
});

// DELETE ALL COMPLETED TASKS
exports.deleteCompletedTasks = catchAsync(async (req, res, next) => {
  const result = await Task.deleteMany({
    userId: req.user._id,
    completed: true
  });

  res.status(200).json({
    status: 'success',
    message: `Deleted ${result.deletedCount} completed tasks`,
    deletedCount: result.deletedCount
  });
});
