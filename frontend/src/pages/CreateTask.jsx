import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTasks } from '../hooks/useTasks'
import TaskForm from '../components/task/TaskForm'
import { scrollToTop } from '../utils/helpers'

const CreateTask = () => {
  const navigate = useNavigate()
  const { addTask, loading } = useTasks()
  const [isSubmitting, setIsSubmitting] = useState(false)

  scrollToTop()

  const handleSubmit = async (taskData) => {
    setIsSubmitting(true)
    try {
      await addTask(taskData)
      navigate('/tasks')
    } catch (error) {
      console.error('Create task error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          Create New Task
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Fill in the details below to create a new task
        </p>
      </div>

      <div className="card p-6">
        <TaskForm onSubmit={handleSubmit} isLoading={isSubmitting || loading} />
      </div>
    </div>
  )
}

export default CreateTask
