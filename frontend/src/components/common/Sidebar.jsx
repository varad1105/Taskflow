import { Link, useLocation } from 'react-router-dom'
import { FiHome, FiList, FiPlusSquare, FiSettings, FiX, FiGrid, FiCalendar, FiBarChart2 } from 'react-icons/fi'

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation()

  const menuItems = [
    { path: '/', icon: FiHome, label: 'Dashboard' },
    { path: '/tasks', icon: FiList, label: 'All Tasks' },
    { path: '/kanban', icon: FiGrid, label: 'Kanban' },
    { path: '/calendar', icon: FiCalendar, label: 'Calendar' },
    { path: '/analytics', icon: FiBarChart2, label: 'Analytics' },
    { path: '/tasks/create', icon: FiPlusSquare, label: 'Create Task' },
  ]

  return (
    <aside className={`fixed inset-y-0 left-0 z-40 w-72 transform bg-white dark:bg-gray-800 shadow-md transition-transform duration-300 lg:relative lg:translate-x-0 lg:block lg:w-64 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="p-6 h-full flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-6 lg:hidden">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              Menu
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
            >
              <FiX size={20} />
            </button>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="hidden lg:block p-6">
          <div className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors">
            <FiSettings size={20} />
            <span className="font-medium">Settings</span>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
