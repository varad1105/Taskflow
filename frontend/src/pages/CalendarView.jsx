import { useMemo, useState } from 'react'
import { useTasks } from '../hooks/useTasks'
import Loader from '../components/common/Loader'
import EmptyState from '../components/common/EmptyState'

const weekdayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const CalendarView = () => {
  const { tasks, loading } = useTasks()
  const [selectedDate, setSelectedDate] = useState(new Date())

  const calendarDays = useMemo(() => {
    const startOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
    const endOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0)
    const startDay = startOfMonth.getDay()
    const totalDays = endOfMonth.getDate()
    const days = []

    for (let index = 0; index < startDay; index += 1) {
      days.push(null)
    }

    for (let day = 1; day <= totalDays; day += 1) {
      days.push(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day))
    }

    return days
  }, [selectedDate])

  const tasksByDate = useMemo(() => {
    return tasks.reduce((acc, task) => {
      const key = new Date(task.dueDate).toISOString().slice(0, 10)
      acc[key] = acc[key] || []
      acc[key].push(task)
      return acc
    }, {})
  }, [tasks])

  const selectedKey = selectedDate.toISOString().slice(0, 10)
  const selectedTasks = tasksByDate[selectedKey] || []

  if (loading) {
    return <Loader />
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Calendar View</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Track deadlines at a glance and jump straight into the tasks that matter.</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="card p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Click a day to inspect tasks</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1))}
                className="rounded-full bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-200"
              >
                ←
              </button>
              <button
                onClick={() => setSelectedDate(new Date())}
                className="rounded-full bg-primary-600 px-3 py-2 text-sm font-semibold text-white"
              >
                Today
              </button>
              <button
                onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1))}
                className="rounded-full bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-200"
              >
                →
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center text-sm font-semibold text-gray-500 dark:text-gray-400">
            {weekdayLabels.map((label) => (
              <div key={label} className="py-2">
                {label}
              </div>
            ))}
            {calendarDays.map((day, index) => {
              if (!day) {
                return <div key={`empty-${index}`} className="h-20 rounded-2xl bg-gray-50 dark:bg-gray-900" />
              }

              const key = day.toISOString().slice(0, 10)
              const dayTasks = tasksByDate[key] || []
              const isSelected = key === selectedKey
              const isToday = key === new Date().toISOString().slice(0, 10)

              return (
                <button
                  key={key}
                  onClick={() => setSelectedDate(day)}
                  className={`h-20 rounded-2xl border p-2 text-left transition ${isSelected ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30' : 'border-gray-200 bg-white hover:border-primary-200 dark:border-gray-700 dark:bg-gray-800'}`}
                >
                  <div className={`text-sm font-semibold ${isToday ? 'text-primary-600 dark:text-primary-300' : 'text-gray-700 dark:text-gray-200'}`}>
                    {day.getDate()}
                  </div>
                  {dayTasks.length > 0 && <div className="mt-2 text-[10px] text-gray-500 dark:text-gray-400">{dayTasks.length} task{dayTasks.length > 1 ? 's' : ''}</div>}
                </button>
              )
            })}
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
          </h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Scheduled tasks for this day</p>

          {selectedTasks.length > 0 ? (
            <div className="mt-6 space-y-3">
              {selectedTasks.map((task) => (
                <div key={task._id} className="rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{task.title}</h3>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{task.description}</p>
                    </div>
                    <span className="rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold text-primary-700 dark:bg-primary-900 dark:text-primary-100">
                      {task.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-6">
              <EmptyState message="Nothing scheduled" description="No tasks are due on this day yet." />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CalendarView
