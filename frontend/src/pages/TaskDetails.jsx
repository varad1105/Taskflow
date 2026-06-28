import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getTask } from '../services/taskService'
import { useTasks } from '../hooks/useTasks'
import Loader from '../components/common/Loader'
import { getPriorityColor, getStatusColor, getCategoryColor, isOverdue, formatDate, formatDateTime } from '../utils/validation'
import { FiEdit2, FiArrowLeft, FiCalendar, FiClock, FiTag } from 'react-icons/fi'
import { toast } from 'react-toastify'
import { scrollToTop } from '../utils/helpers'

const TaskDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { removeTask } = useTasks()
  const [task, setTask] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

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

  const handleDelete = async () => {
    try {
      await removeTask(id)
      toast.success('Task deleted successfully')
      navigate('/tasks')
    } catch (error) {
      toast.error('Failed to delete task')
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

  const overdue = isOverdue(task.dueDate) && task.status !== 'Completed'

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Button */}
      <Link
        to="/tasks"
        className="inline-flex items-center text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 mb-6 transition-colors"
      >
        <FiArrowLeft className="mr-2" size={20} />
        Back to Tasks
      </Link>

      <div className="card p-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
              {task.title}
            </h1>
            <div className="flex flex-wrap gap-2">
              <span className={`badge ${getPriorityColor(task.priority)}`}>
                {task.priority}
              </span>
              <span className={`badge ${getStatusColor(task.status)}`}>
                {task.status}
              </span>
              <span className={`badge ${getCategoryColor(task.category)}`}>
                {task.category}
              </span>
              {overdue && (
                <span className="badge bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                  Overdue
                </span>
              )}
            </div>
          </div>
          <div className="flex space-x-2">
            <Link
              to={`/tasks/edit/${task._id}`}
              className="btn-primary flex items-center"
            >
              <FiEdit2 className="mr-2" size={18} />
              Edit
            </Link>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="btn-danger"
            >
              Delete
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
            Description
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            {task.description}
          </p>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Due Date */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
              <FiCalendar className="mr-2" size={20} />
              <span className="font-medium">Due Date</span>
            </div>
            <p className="text-gray-800 dark:text-white font-semibold">
              {formatDate(task.dueDate)}
            </p>
          </div>

          {/* Created Date */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
              <FiClock className="mr-2" size={20} />
              <span className="font-medium">Created</span>
            </div>
            <p className="text-gray-800 dark:text-white font-semibold">
              {formatDateTime(task.createdAt)}
            </p>
          </div>

          {/* Updated Date */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
              <FiClock className="mr-2" size={20} />
              <span className="font-medium">Last Updated</span>
            </div>
            <p className="text-gray-800 dark:text-white font-semibold">
              {formatDateTime(task.updatedAt)}
            </p>
          </div>

          {/* Category */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
              <FiTag className="mr-2" size={20} />
              <span className="font-medium">Category</span>
            </div>
            <p className="text-gray-800 dark:text-white font-semibold">
              {task.category}
            </p>
          </div>
        </div>

        {/* Status Timeline */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Task Progress
          </h2>
          <div className="flex items-center space-x-4">
            <div
              className={`flex-1 h-2 rounded-full ${
                task.status === 'Completed'
                  ? 'bg-green-500'
                  : task.status === 'In Progress'
                  ? 'bg-yellow-500'
                  : 'bg-gray-300 dark:bg-gray-600'
              }`}
            ></div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {task.status}
            </span>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setShowDeleteModal(false)}
          />
          <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Delete Task
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to delete this task? This action cannot be undone.
            </p>
            <div className="flex space-x-4 justify-end">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="btn-danger"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TaskDetails
