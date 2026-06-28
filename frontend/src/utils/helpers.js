export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

export const getCompletionPercentage = (tasks) => {
  if (tasks.length === 0) return 0
  const completed = tasks.filter((task) => task.status === 'Completed').length
  return Math.round((completed / tasks.length) * 100)
}

export const getTodayTasks = (tasks) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  return tasks.filter((task) => {
    const taskDate = new Date(task.dueDate)
    return taskDate >= today && taskDate < tomorrow
  })
}

export const getUpcomingTasks = (tasks) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const nextWeek = new Date(today)
  nextWeek.setDate(nextWeek.getDate() + 7)

  return tasks.filter((task) => {
    const taskDate = new Date(task.dueDate)
    return taskDate > today && taskDate <= nextWeek
  })
}

export const getOverdueTasks = (tasks) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return tasks.filter((task) => {
    const taskDate = new Date(task.dueDate)
    return taskDate < today && task.status !== 'Completed'
  })
}

export const isToday = (dateString) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  const taskDate = new Date(dateString)
  return taskDate >= today && taskDate < tomorrow
}

export const isUpcoming = (dateString) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const nextWeek = new Date(today)
  nextWeek.setDate(nextWeek.getDate() + 7)
  const taskDate = new Date(dateString)
  return taskDate > today && taskDate <= nextWeek
}

export const sortTasks = (tasks, sortBy) => {
  const sorted = [...tasks]

  switch (sortBy) {
    case 'newest':
      return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    case 'oldest':
      return sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    case 'priority':
      const priorityOrder = { High: 3, Medium: 2, Low: 1 }
      return sorted.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority])
    case 'dueDate':
      return sorted.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    case 'alphabetical':
      return sorted.sort((a, b) => a.title.localeCompare(b.title))
    default:
      return sorted
  }
}

export const filterTasks = (tasks, filters) => {
  return tasks.filter((task) => {
    const matchesPriority = !filters.priority || task.priority === filters.priority
    const matchesStatus = !filters.status || task.status === filters.status
    const matchesCategory = !filters.category || task.category === filters.category
    const matchesSearch =
      !filters.search ||
      task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      task.description.toLowerCase().includes(filters.search.toLowerCase()) ||
      task.category.toLowerCase().includes(filters.search.toLowerCase())

    const matchesDueDate = !filters.dueDate || new Date(task.dueDate).toISOString().slice(0, 10) === filters.dueDate
    const matchesDueStatus =
      !filters.dueStatus ||
      (filters.dueStatus === 'Due Today' && isToday(task.dueDate)) ||
      (filters.dueStatus === 'Overdue' && task.status !== 'Completed' && !isToday(task.dueDate) && new Date(task.dueDate) < new Date(new Date().setHours(0, 0, 0, 0))) ||
      (filters.dueStatus === 'Upcoming' && isUpcoming(task.dueDate))

    return matchesPriority && matchesStatus && matchesCategory && matchesSearch && matchesDueDate && matchesDueStatus
  })
}
