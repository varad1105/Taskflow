import { FiInbox } from 'react-icons/fi'

const EmptyState = ({ message, description }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
        <FiInbox size={48} className="text-gray-400 dark:text-gray-500" />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
        {message || 'No tasks found'}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">
        {description || 'Create your first task to get started with TaskFlow Pro.'}
      </p>
    </div>
  )
}

export default EmptyState
