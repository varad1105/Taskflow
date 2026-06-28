import { useState, useEffect } from 'react'
import { useTasks } from '../hooks/useTasks'
import { useNavigate } from 'react-router-dom'
import TaskCard from '../components/task/TaskCard'
import SearchBar from '../components/task/SearchBar'
import FilterPanel from '../components/task/FilterPanel'
import EmptyState from '../components/common/EmptyState'
import Modal from '../components/common/Modal'
import DeleteConfirmation from '../components/task/DeleteConfirmation'
import LoadingSkeleton from '../components/common/LoadingSkeleton'
import { sortTasks, filterTasks } from '../utils/helpers'
import { scrollToTop } from '../utils/helpers'

const AllTasks = () => {
  const { tasks, loading, removeTask, editTask } = useTasks()
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    priority: '',
    status: '',
    category: '',
    dueDate: '',
    dueStatus: '',
  })
  const [sortBy, setSortBy] = useState('newest')
  const [showFilterPanel, setShowFilterPanel] = useState(false)
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    taskId: null,
    taskTitle: '',
  })

  useEffect(() => {
    scrollToTop()
  }, [])

  // Apply filters and search
  const filteredTasks = filterTasks(tasks, { ...filters, search: searchTerm })

  // Apply sorting
  const sortedTasks = sortTasks(filteredTasks, sortBy)

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleClearFilters = () => {
    setFilters({
      priority: '',
      status: '',
      category: '',
      dueDate: '',
      dueStatus: '',
    })
    setSearchTerm('')
  }

  const handleDeleteClick = (taskId, taskTitle) => {
    setDeleteModal({
      isOpen: true,
      taskId,
      taskTitle,
    })
  }

  const handleCompleteTask = async (task) => {
    try {
      await editTask(task._id, { ...task, status: 'Completed' })
    } catch (error) {
      console.error('Complete error:', error)
    }
  }

  const handleDeleteConfirm = async () => {
    try {
      await removeTask(deleteModal.taskId)
      setDeleteModal({ isOpen: false, taskId: null, taskTitle: '' })
    } catch (error) {
      console.error('Delete error:', error)
    }
  }

  if (loading) {
    return <LoadingSkeleton />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            All Tasks
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage and organize your tasks
          </p>
        </div>
        <button
          onClick={() => navigate('/tasks/create')}
          className="btn-primary"
        >
          Create Task
        </button>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search by title or description..."
          />
        </div>
        <div className="flex gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="input-field"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="priority">Priority</option>
            <option value="dueDate">Due Date</option>
            <option value="alphabetical">Alphabetical</option>
          </select>
          <button
            onClick={() => setShowFilterPanel(!showFilterPanel)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              showFilterPanel
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
            }`}
          >
            Filters
          </button>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilterPanel && (
        <div className="lg:hidden">
          <FilterPanel
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
          />
        </div>
      )}

      {/* Main Content */}
      <div className="flex gap-6">
        {/* Sidebar Filter (Desktop) */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <FilterPanel
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
          />
        </div>

        {/* Task Grid */}
        <div className="flex-1">
          {sortedTasks.length > 0 ? (
            <>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Showing {sortedTasks.length} task{sortedTasks.length !== 1 ? 's' : ''}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {sortedTasks.map((task) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    onEdit={(id) => navigate(`/tasks/edit/${id}`)}
                    onDelete={() => handleDeleteClick(task._id, task.title)}
                    onComplete={handleCompleteTask}
                  />
                ))}
              </div>
            </>
          ) : (
            <EmptyState
              message="No tasks found"
              description={
                searchTerm || Object.values(filters).some(Boolean)
                  ? 'Try adjusting your search or filters'
                  : 'Create your first task to get started'
              }
            />
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, taskId: null, taskTitle: '' })}
        title="Delete Task"
      >
        <DeleteConfirmation
          taskTitle={deleteModal.taskTitle}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteModal({ isOpen: false, taskId: null, taskTitle: '' })}
        />
      </Modal>
    </div>
  )
}

export default AllTasks
