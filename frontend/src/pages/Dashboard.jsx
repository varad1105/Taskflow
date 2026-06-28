import { useEffect, useState } from 'react'
import { useTasks } from '../hooks/useTasks'
import { useNavigate } from 'react-router-dom'
import StatisticsCards from '../components/statistics/StatisticsCards'
import TaskCard from '../components/task/TaskCard'
import LoadingSkeleton from '../components/common/LoadingSkeleton'
import EmptyState from '../components/common/EmptyState'
import { getTodayTasks, getUpcomingTasks, getOverdueTasks, getCompletionPercentage } from '../utils/helpers'
import { scrollToTop } from '../utils/helpers'

const Dashboard = () => {
  const { tasks, loading } = useTasks()
  const navigate = useNavigate()
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    scrollToTop()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  const todayTasks = getTodayTasks(tasks)
  const upcomingTasks = getUpcomingTasks(tasks)
  const overdueTasks = getOverdueTasks(tasks)
  const completionPercentage = getCompletionPercentage(tasks)
  const recentTasks = [...tasks]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4)

  if (loading) {
    return <LoadingSkeleton />
  }

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">
        <div className="card p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-sm text-primary-600 font-semibold uppercase tracking-[0.2em]">
                TaskFlow Pro
              </p>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-4">
                Build your best day
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-2xl">
                Stay focused with an elegant task dashboard, fast actions, and smart insights.
              </p>
            </div>
            <button
              onClick={() => navigate('/tasks/create')}
              className="btn-primary"
            >
              Quick Add Task
            </button>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-gray-100 dark:border-gray-700 p-5 bg-gray-50 dark:bg-gray-900">
              <p className="text-sm text-gray-500 dark:text-gray-400">Today</p>
              <p className="mt-2 text-xl font-semibold text-gray-900 dark:text-white">
                {currentTime.toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {currentTime.toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
            <div className="rounded-3xl border border-gray-100 dark:border-gray-700 p-5 bg-white dark:bg-gray-800">
              <p className="text-sm text-gray-500 dark:text-gray-400">Completion</p>
              <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                {completionPercentage}%
              </p>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                tasks completed out of {tasks.length}
              </p>
            </div>
          </div>
        </div>

        <div className="card p-6 bg-gradient-to-br from-primary-600 to-cyan-500 text-white">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-primary-100">
                Productivity snapshot
              </p>
              <h2 className="mt-4 text-3xl font-bold">{tasks.length} Active Tasks</h2>
              <p className="mt-3 text-sm text-primary-100">
                {todayTasks.length} due today · {overdueTasks.length} overdue · {upcomingTasks.length} upcoming
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <div className="rounded-3xl bg-white/10 p-4">
              <p className="text-sm text-primary-100">Completed</p>
              <p className="mt-2 text-2xl font-semibold">{completionPercentage}%</p>
            </div>
            <div className="rounded-3xl bg-white/10 p-4">
              <p className="text-sm text-primary-100">Overdue</p>
              <p className="mt-2 text-2xl font-semibold">{overdueTasks.length}</p>
            </div>
          </div>
        </div>
      </div>

      <StatisticsCards tasks={tasks} />

      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6 gap-3">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                Recent Tasks
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Your latest activity and priorities for the week.
              </p>
            </div>
            <button
              onClick={() => navigate('/tasks')}
              className="btn-secondary"
            >
              View All Tasks
            </button>
          </div>

          {recentTasks.length > 0 ? (
            <div className="grid gap-4">
              {recentTasks.map((task) => (
                <div key={task._id} className="rounded-3xl border border-gray-200 dark:border-gray-700 p-5 bg-gray-50 dark:bg-gray-900">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {task.title}
                      </h3>
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {task.description}
                      </p>
                    </div>
                    <div className="space-y-2 text-right">
                      <span className="inline-flex items-center rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold text-primary-700 dark:bg-primary-900 dark:text-primary-100">
                        {task.status}
                      </span>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Due {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState message="No recent tasks" description="Create a task to see it here." />
          )}
        </div>

        <div className="space-y-6">
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Due Today
            </h3>
            <p className="text-3xl font-bold text-primary-600 dark:text-primary-300">
              {todayTasks.length}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Tasks that need your attention before the day ends.
            </p>
          </div>

          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Overdue Tasks
            </h3>
            <p className="text-3xl font-bold text-red-600 dark:text-red-300">
              {overdueTasks.length}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Tasks that require immediate follow-up.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
