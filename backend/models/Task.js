const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a task title'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a task description'],
      trim: true,
      maxlength: [500, 'Description cannot be more than 500 characters'],
    },
    priority: {
      type: String,
      required: [true, 'Please provide a priority'],
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium',
    },
    status: {
      type: String,
      required: [true, 'Please provide a status'],
      enum: ['Pending', 'In Progress', 'Completed'],
      default: 'Pending',
    },
    category: {
      type: String,
      required: [true, 'Please provide a category'],
      enum: ['Personal', 'Work', 'Study', 'Health', 'Other'],
      default: 'Other',
    },
    dueDate: {
      type: Date,
      required: [true, 'Please provide a due date'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Task', taskSchema);
