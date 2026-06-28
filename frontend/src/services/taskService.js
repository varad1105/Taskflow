import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001'
const taskService = axios.create({
  baseURL: `${API_URL}/api/tasks`,
  headers: {
    'Content-Type': 'application/json',
  },
})

const getCurrentUserId = () => {
  const user = localStorage.getItem('taskflow_user')
  if (!user) return 'guest'
  try {
    const parsed = JSON.parse(user)
    return parsed && parsed.id ? parsed.id : 'guest'
  } catch (e) {
    return 'guest'
  }
}

const getLocalTasks = () => {
  const userId = getCurrentUserId()
  const saved = localStorage.getItem(`taskflow_tasks_${userId}`)
  return saved ? JSON.parse(saved) : []
}

const saveLocalTasks = (tasks) => {
  const userId = getCurrentUserId()
  localStorage.setItem(`taskflow_tasks_${userId}`, JSON.stringify(tasks))
}

const withLocalFallback = async (request, fallback) => {
  try {
    const response = await request()
    if (response && typeof response === 'object' && 'data' in response) return response.data
    return response
  } catch (error) {
    return await Promise.resolve(fallback())
  }
}

// Get all tasks
export const getTasks = async () => {
  return withLocalFallback(() => taskService.get('/'), () => getLocalTasks())
}

// Get single task
export const getTask = async (id) => {
  return withLocalFallback(() => taskService.get(`/${id}`), () => getLocalTasks().find((task) => task._id === id))
}

// Create task
export const createTask = async (taskData) => {
  const task = {
    ...taskData,
    _id: `${Date.now()}`,
    ownerId: getCurrentUserId(),
    createdAt: new Date().toISOString(),
  }

  return withLocalFallback(
    () => taskService.post('/', task),
    () => {
      const tasks = [...getLocalTasks(), task]
      saveLocalTasks(tasks)
      return task
    }
  )
}

// Update task
export const updateTask = async (id, taskData) => {
  return withLocalFallback(
    () => taskService.put(`/${id}`, taskData),
    () => {
      const tasks = getLocalTasks().map((task) => (task._id === id ? { ...task, ...taskData, _id: id } : task))
      saveLocalTasks(tasks)
      return tasks.find((task) => task._id === id)
    },
  )
}

// Delete task
export const deleteTask = async (id) => {
  return withLocalFallback(
    () => taskService.delete(`/${id}`),
    () => {
      const tasks = getLocalTasks().filter((task) => task._id !== id)
      saveLocalTasks(tasks)
      return { success: true }
    },
  )
}

export default taskService
