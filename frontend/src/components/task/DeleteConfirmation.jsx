import { FiAlertTriangle } from 'react-icons/fi'

const DeleteConfirmation = ({ taskTitle, onConfirm, onCancel }) => {
  return (
    <div className="text-center">
      <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
        <FiAlertTriangle size={32} className="text-red-600 dark:text-red-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
        Delete Task
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Are you sure you want to delete the task "{taskTitle}"? This action cannot be undone.
      </p>
      <div className="flex space-x-4 justify-center">
        <button
          onClick={onCancel}
          className="btn-secondary"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="btn-danger"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default DeleteConfirmation
