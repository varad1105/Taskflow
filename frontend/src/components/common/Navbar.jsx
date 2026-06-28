import { Link } from 'react-router-dom'
import { FiMenu, FiX, FiSun, FiMoon, FiLogOut } from 'react-icons/fi'
import { useTheme } from '../../context/ThemeContext'
import { useAuth } from '../../context/AuthContext'
import { useState } from 'react'

const Navbar = ({ sidebarOpen, onToggleSidebar }) => {
  const { darkMode, toggleTheme } = useTheme()
  const { isAuthenticated, currentUser, logout } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">T</span>
            </div>
            <span className="text-xl font-bold text-gray-800 dark:text-white">
              TaskFlow Pro
            </span>
          </Link>

          {/* Tablet Navigation Toggle */}
          <div className="hidden md:flex lg:hidden items-center space-x-2">
            <button
              onClick={onToggleSidebar}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/" className="text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-md font-medium transition-colors">Dashboard</Link>
                <Link to="/tasks" className="text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-md font-medium transition-colors">All Tasks</Link>
                <Link to="/kanban" className="text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-md font-medium transition-colors">Kanban</Link>
                <Link to="/calendar" className="text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-md font-medium transition-colors">Calendar</Link>
                <Link to="/analytics" className="text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-md font-medium transition-colors">Analytics</Link>
                <Link to="/tasks/create" className="btn-primary">Create Task</Link>
                <span className="rounded-full bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-200">{currentUser?.name || 'User'}</span>
              </>
            ) : (
              <Link to="/auth" className="btn-primary">Sign in</Link>
            )}
            <button onClick={toggleTheme} className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
              {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>
            {isAuthenticated && (
              <button onClick={logout} className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors" title="Log out">
                <FiLogOut size={20} />
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
            >
              {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
            >
              {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            {isAuthenticated ? (
              <>
                <Link to="/" className="block text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-md font-medium" onClick={() => setIsMobileMenuOpen(false)}>Dashboard</Link>
                <Link to="/tasks" className="block text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-md font-medium" onClick={() => setIsMobileMenuOpen(false)}>All Tasks</Link>
                <Link to="/kanban" className="block text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-md font-medium" onClick={() => setIsMobileMenuOpen(false)}>Kanban</Link>
                <Link to="/calendar" className="block text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-md font-medium" onClick={() => setIsMobileMenuOpen(false)}>Calendar</Link>
                <Link to="/analytics" className="block text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-md font-medium" onClick={() => setIsMobileMenuOpen(false)}>Analytics</Link>
                <Link to="/tasks/create" className="block btn-primary text-center" onClick={() => setIsMobileMenuOpen(false)}>Create Task</Link>
                <button onClick={() => { logout(); setIsMobileMenuOpen(false) }} className="flex w-full items-center justify-center rounded-lg bg-gray-100 px-3 py-2 font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-200">Log out</button>
              </>
            ) : (
              <Link to="/auth" className="block btn-primary text-center" onClick={() => setIsMobileMenuOpen(false)}>Sign in</Link>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
