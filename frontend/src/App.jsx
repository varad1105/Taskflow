import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import Navbar from './components/common/Navbar'
import Sidebar from './components/common/Sidebar'
import Footer from './components/common/Footer'
import Dashboard from './pages/Dashboard'
import AllTasks from './pages/AllTasks'
import CreateTask from './pages/CreateTask'
import EditTask from './pages/EditTask'
import TaskDetails from './pages/TaskDetails'
import NotFound from './pages/NotFound'
import AuthPage from './pages/AuthPage'
import KanbanBoard from './pages/KanbanBoard'
import CalendarView from './pages/CalendarView'
import AnalyticsPage from './pages/AnalyticsPage'
import { useTheme } from './context/ThemeContext'
import { useAuth } from './context/AuthContext'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? children : <Navigate to="/auth" replace />
}

function App() {
  const { darkMode } = useTheme()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <Router>
      <div className={`min-h-screen flex flex-col ${darkMode ? 'dark' : ''}`}>
        <Navbar sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />
        <div className="flex flex-1 relative">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}
          <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
            <Routes>
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/tasks" element={<ProtectedRoute><AllTasks /></ProtectedRoute>} />
              <Route path="/tasks/create" element={<ProtectedRoute><CreateTask /></ProtectedRoute>} />
              <Route path="/tasks/edit/:id" element={<ProtectedRoute><EditTask /></ProtectedRoute>} />
              <Route path="/tasks/:id" element={<ProtectedRoute><TaskDetails /></ProtectedRoute>} />
              <Route path="/kanban" element={<ProtectedRoute><KanbanBoard /></ProtectedRoute>} />
              <Route path="/calendar" element={<ProtectedRoute><CalendarView /></ProtectedRoute>} />
              <Route path="/analytics" element={<ProtectedRoute><AnalyticsPage /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
        <Footer />
      </div>
    </Router>
  )
}

export default App
