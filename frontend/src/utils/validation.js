export const validateTaskForm = (formData) => {
  const errors = {}

  if (!formData.title.trim()) {
    errors.title = 'Title is required'
  } else if (formData.title.length > 100) {
    errors.title = 'Title cannot exceed 100 characters'
  }

  if (!formData.description.trim()) {
    errors.description = 'Description is required'
  } else if (formData.description.length > 500) {
    errors.description = 'Description cannot exceed 500 characters'
  }

  if (!formData.priority) {
    errors.priority = 'Priority is required'
  }

  if (!formData.status) {
    errors.status = 'Status is required'
  }

  if (!formData.category) {
    errors.category = 'Category is required'
  }

  if (!formData.dueDate) {
    errors.dueDate = 'Due date is required'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

export const getPriorityColor = (priority) => {
  switch (priority) {
    case 'High':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    case 'Medium':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    case 'Low':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
  }
}

export const getStatusColor = (status) => {
  switch (status) {
    case 'Completed':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    case 'In Progress':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
    case 'Pending':
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
  }
}

export const getCategoryColor = (category) => {
  switch (category) {
    case 'Work':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
    case 'Personal':
      return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200'
    case 'Study':
      return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
    case 'Health':
      return 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200'
    case 'Other':
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
  }
}

export const isOverdue = (dueDate) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return new Date(dueDate) < today
}

export const isToday = (dateString) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  const taskDate = new Date(dateString)
  return taskDate >= today && taskDate < tomorrow
}

export const getDueDateColor = (dueDate) => {
  if (isOverdue(dueDate)) {
    return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
  }

  if (isToday(dueDate)) {
    return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
  }

  const now = new Date()
  now.setHours(0, 0, 0, 0)
  const taskDate = new Date(dueDate)
  const diff = Math.ceil((taskDate - now) / (1000 * 60 * 60 * 24))

  if (diff <= 5) {
    return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
  }

  return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
}

export const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export const formatDateTime = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
