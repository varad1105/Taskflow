import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTasks } from '../hooks/useTasks'
import Loader from '../components/common/Loader'
import EmptyState from '../components/common/EmptyState'

const columns = [
  { key: 'Pending', title: 'Pending', accent: 'bg-slate-500' },
  { key: 'In Progress', title: 'In Progress', accent: 'bg-blue-500' },
  { key: 'Completed', title: 'Completed', accent: 'bg-emerald-500' },
]

const KanbanBoard = () => {
  const { tasks, loading, editTask } = useTasks()
  const navigate = useNavigate()

  const groupedTasks = useMemo(() => {
    return columns.reduce((acc, column) => {
      acc[column.key] = tasks.filter((task) => task.status === column.key)
      return acc
    }, {})
  }, [tasks])

  const handleDrop = async (status) => {
    const taskId = window.__draggedTaskId
    if (!taskId) return

    const task = tasks.find((entry) => entry._id === taskId)
    if (!task || task.status === status) return

    await editTask(taskId, { ...task, status })
    window.__draggedTaskId = null
  }

  if (loading) {
    return <Loader />
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Kanban Board</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Drag tasks across columns to reflect your current progress.</p>
        </div>
        <button onClick={() => navigate('/tasks/create')} className="btn-primary">
          Add Task
        </button>
      </div>

      {tasks.length === 0 ? (
        <EmptyState message="No tasks yet" description="Create your first task to start organizing your workflow." />
      ) : (
        <div className="grid gap-6 xl:grid-cols-3">
          {columns.map((column) => (
            <div
              key={column.key}
              className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800"
              onDragOver={(event) => event.preventDefault()}
              onDrop={() => handleDrop(column.key)}
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className={`h-3 w-3 rounded-full ${column.accent}`} />
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{column.title}</h2>
                </div>
                <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                  {groupedTasks[column.key].length}
                </span>
              </div>

              <div className="space-y-3">
                {groupedTasks[column.key].length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-gray-300 p-4 text-sm text-gray-500 dark:border-gray-600 dark:text-gray-400">
                    Drop a task here
                  </div>
                ) : (
                  groupedTasks[column.key].map((task) => (
                    <div
                      key={task._id}
                      draggable
                      onDragStart={() => {
                        window.__draggedTaskId = task._id
                      }}
                      className="cursor-move rounded-2xl border border-gray-200 bg-gray-50 p-4 shadow-sm transition hover:border-primary-500 hover:shadow-md dark:border-gray-700 dark:bg-gray-900"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">{task.title}</h3>
                          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{task.description}</p>
                        </div>
                        <span className="rounded-full bg-primary-100 px-2 py-1 text-xs font-semibold text-primary-700 dark:bg-primary-900 dark:text-primary-100">
                          {task.priority}
                        </span>
                      </div>
                      <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">Due {new Date(task.dueDate).toLocaleDateString()}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default KanbanBoard
