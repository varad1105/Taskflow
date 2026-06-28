import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getTask } from '../services/taskService'
import { useTasks } from '../hooks/useTasks'
import TaskForm from '../components/task/TaskForm'
import Loader from '../components/common/Loader'
import { toast } from 'react-toastify'
import { scrollToTop } from '../utils/helpers'

const EditTask = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { editTask } = useTasks()
  const [task, setTask] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    scrollToTop()
    fetchTask()
  }, [id])

  const fetchTask = async () => {
    try {
      setLoading(true)
      const response = await getTask(id)
      setTask(response.data)
    } catch (error) {
      toast.error('Failed to fetch task details')
      navigate('/tasks')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (taskData) => {
    setIsSubmitting(true)
    try {
      await editTask(id, taskData)
      navigate('/tasks')
    } catch (error) {
      console.error('Update task error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return <Loader />
  }

  if (!task) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400">Task not found</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          Edit Task
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Update the task details below
        </p>
      </div>

      <div className="card p-6">
        <TaskForm
          initialData={task}
          onSubmit={handleSubmit}
          isLoading={isSubmitting}
        />
      </div>
    </div>
  )
}

export default EditTask
