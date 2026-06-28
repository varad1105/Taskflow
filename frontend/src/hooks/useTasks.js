import { useState, useEffect } from 'react'
import { getTasks, createTask, updateTask, deleteTask } from '../services/taskService'
import { toast } from 'react-toastify'

export const useTasks = () => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Fetch all tasks
  const fetchTasks = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await getTasks()
      setTasks(response.data)
    } catch (err) {
      setError(err.message)
      toast.error('Failed to fetch tasks')
    } finally {
      setLoading(false)
    }
  }

  // Add new task
  const addTask = async (taskData) => {
    setLoading(true)
    try {
      const response = await createTask(taskData)
      setTasks([response.data, ...tasks])
      toast.success('Task created successfully')
      return response.data
    } catch (err) {
      toast.error('Failed to create task')
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Update existing task
  const editTask = async (id, taskData) => {
    setLoading(true)
    try {
      const response = await updateTask(id, taskData)
      setTasks(tasks.map((task) => (task._id === id ? response.data : task)))
      toast.success('Task updated successfully')
      return response.data
    } catch (err) {
      toast.error('Failed to update task')
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Delete task
  const removeTask = async (id) => {
    setLoading(true)
    try {
      await deleteTask(id)
      setTasks(tasks.filter((task) => task._id !== id))
      toast.success('Task deleted successfully')
    } catch (err) {
      toast.error('Failed to delete task')
      throw err
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    addTask,
    editTask,
    removeTask,
  }
}
