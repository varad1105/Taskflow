import { useMemo } from 'react'
import { useTasks } from '../hooks/useTasks'
import Loader from '../components/common/Loader'

const AnalyticsPage = () => {
  const { tasks, loading } = useTasks()

  const totals = useMemo(() => {
    const statusCounts = tasks.reduce((acc, task) => {
      acc[task.status] = (acc[task.status] || 0) + 1
      return acc
    }, {})

    const priorityCounts = tasks.reduce((acc, task) => {
      acc[task.priority] = (acc[task.priority] || 0) + 1
      return acc
    }, {})

    const categoryCounts = tasks.reduce((acc, task) => {
      acc[task.category] = (acc[task.category] || 0) + 1
      return acc
    }, {})

    return { statusCounts, priorityCounts, categoryCounts }
  }, [tasks])

  if (loading) {
    return <Loader />
  }

  const renderBar = (label, value, total, color) => (
    <div key={label} className="space-y-2">
      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
        <span>{label}</span>
        <span className="font-semibold text-gray-900 dark:text-white">{value}</span>
      </div>
      <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700">
        <div className={`h-2 rounded-full ${color}`} style={{ width: `${total === 0 ? 0 : (value / total) * 100}%` }} />
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics & Widgets</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Monitor your workload with quick, visual snapshots of priorities and progress.</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Task status overview</h2>
          <div className="mt-6 space-y-4">
            {Object.entries(totals.statusCounts).map(([label, value]) => renderBar(label, value, tasks.length, 'bg-primary-600'))}
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Priority distribution</h2>
          <div className="mt-6 space-y-4">
            {Object.entries(totals.priorityCounts).map(([label, value]) => renderBar(label, value, tasks.length, 'bg-amber-500'))}
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Categories</h2>
          <div className="mt-6 space-y-4">
            {Object.entries(totals.categoryCounts).map(([label, value]) => renderBar(label, value, tasks.length, 'bg-emerald-500'))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="card p-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total tasks</p>
          <p className="mt-3 text-3xl font-bold text-gray-900 dark:text-white">{tasks.length}</p>
        </div>
        <div className="card p-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">Completed</p>
          <p className="mt-3 text-3xl font-bold text-emerald-600">{totals.statusCounts.Completed || 0}</p>
        </div>
        <div className="card p-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">In progress</p>
          <p className="mt-3 text-3xl font-bold text-blue-600">{totals.statusCounts['In Progress'] || 0}</p>
        </div>
        <div className="card p-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">High priority</p>
          <p className="mt-3 text-3xl font-bold text-amber-600">{totals.priorityCounts.High || 0}</p>
        </div>
      </div>
    </div>
  )
}

export default AnalyticsPage
