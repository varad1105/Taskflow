import { Link } from 'react-router-dom'
import { FiEdit2, FiTrash2, FiCalendar, FiClock, FiCheckCircle, FiBriefcase, FiBookOpen, FiHeart, FiUser, FiLayers } from 'react-icons/fi'
import { getPriorityColor, getStatusColor, getCategoryColor, isOverdue, isToday, formatDate, getDueDateColor } from '../../utils/validation'

const categoryIcons = {
  Work: FiBriefcase,
  Study: FiBookOpen,
  Health: FiHeart,
  Personal: FiUser,
  Other: FiLayers,
}

const TaskCard = ({ task, onDelete, onEdit, onComplete }) => {
  const overdue = isOverdue(task.dueDate) && task.status !== 'Completed'
  const dueToday = isToday(task.dueDate)
  const CategoryIcon = categoryIcons[task.category] || FiLayers

  return (
    <div className="card p-6 hover:scale-[1.02] transition-transform duration-200">
      <div className="flex justify-between items-start mb-4 gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-700 text-primary-600">
              <CategoryIcon size={18} />
            </span>
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              {task.category}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 line-clamp-1">
            {task.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-3">
            {task.description}
          </p>
        </div>
        <div className="flex space-x-2 ml-4">
          {onEdit && (
            <button
              onClick={() => onEdit(task._id)}
              className="p-2 text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
              title="Edit"
            >
              <FiEdit2 size={18} />
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(task._id)}
              className="p-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
              title="Delete"
            >
              <FiTrash2 size={18} />
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <span className={`badge ${getPriorityColor(task.priority)}`}>
          {task.priority}
        </span>
        <span className={`badge ${getStatusColor(task.status)}`}>
          {task.status}
        </span>
        <span className={`badge ${getCategoryColor(task.category)}`}>
          {task.category}
        </span>
        <span className={`badge ${getDueDateColor(task.dueDate)}`}>
          {dueToday ? 'Due Today' : `Due ${formatDate(task.dueDate)}`}
        </span>
        {overdue && (
          <span className="badge bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
            Overdue
          </span>
        )}
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
        <div className="flex items-center space-x-1">
          <FiCalendar size={16} />
          <span>{formatDate(task.dueDate)}</span>
        </div>
        <div className="flex items-center space-x-1">
          <FiClock size={16} />
          <span>{new Date(task.createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <Link
          to={`/tasks/${task._id}`}
          className="w-full py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm font-medium text-center"
        >
          View Details
        </Link>
        {onComplete && task.status !== 'Completed' && (
          <button
            onClick={() => onComplete(task)}
            className="w-full py-2 px-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
          >
            Mark Complete
          </button>
        )}
      </div>
    </div>
  )
}

export default TaskCard
