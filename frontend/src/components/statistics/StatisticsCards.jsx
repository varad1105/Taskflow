import { FiCheckCircle, FiClock, FiList, FiAlertCircle, FiTrendingUp } from 'react-icons/fi'

const StatisticsCards = ({ tasks }) => {
  const totalTasks = tasks.length
  const completedTasks = tasks.filter((task) => task.status === 'Completed').length
  const pendingTasks = tasks.filter((task) => task.status === 'Pending').length
  const inProgressTasks = tasks.filter((task) => task.status === 'In Progress').length
  const highPriorityTasks = tasks.filter((task) => task.priority === 'High').length
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  const dueTodayTasks = tasks.filter((task) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    const taskDate = new Date(task.dueDate)
    return taskDate >= today && taskDate < tomorrow
  }).length

  const overdueTasks = tasks.filter((task) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const taskDate = new Date(task.dueDate)
    return taskDate < today && task.status !== 'Completed'
  }).length

  const stats = [
    {
      title: 'Total Tasks',
      value: totalTasks,
      icon: FiList,
      bgColor: 'bg-blue-100 dark:bg-blue-900',
      textColor: 'text-blue-600 dark:text-blue-400',
    },
    {
      title: 'Completed',
      value: completedTasks,
      icon: FiCheckCircle,
      bgColor: 'bg-green-100 dark:bg-green-900',
      textColor: 'text-green-600 dark:text-green-400',
    },
    {
      title: 'In Progress',
      value: inProgressTasks,
      icon: FiClock,
      bgColor: 'bg-yellow-100 dark:bg-yellow-900',
      textColor: 'text-yellow-600 dark:text-yellow-400',
    },
    {
      title: 'Pending',
      value: pendingTasks,
      icon: FiAlertCircle,
      bgColor: 'bg-gray-100 dark:bg-gray-700',
      textColor: 'text-gray-600 dark:text-gray-400',
    },
    {
      title: 'High Priority',
      value: highPriorityTasks,
      icon: FiTrendingUp,
      bgColor: 'bg-red-100 dark:bg-red-900',
      textColor: 'text-red-600 dark:text-red-400',
    },
    {
      title: 'Due Today',
      value: dueTodayTasks,
      icon: FiClock,
      bgColor: 'bg-cyan-100 dark:bg-cyan-900',
      textColor: 'text-cyan-600 dark:text-cyan-300',
    },
    {
      title: 'Overdue',
      value: overdueTasks,
      icon: FiAlertCircle,
      bgColor: 'bg-red-100 dark:bg-red-900',
      textColor: 'text-red-600 dark:text-red-200',
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <div
            key={stat.title}
            className="card p-6 flex flex-col items-center justify-center"
          >
            <div className={`${stat.bgColor} p-3 rounded-full mb-3`}>
              <Icon size={24} className={stat.textColor} />
            </div>
            <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-1">
              {stat.value}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{stat.title}</p>
          </div>
        )
      })}
    </div>
  )
}

export default StatisticsCards
