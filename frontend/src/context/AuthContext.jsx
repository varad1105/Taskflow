import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const savedUser = localStorage.getItem('taskflow_user')
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser)
        setCurrentUser(parsed)
        setIsAuthenticated(true)
      } catch {
        localStorage.removeItem('taskflow_user')
      }
    }
  }, [])

  const login = (email, password) => {
    const savedUsers = JSON.parse(localStorage.getItem('taskflow_users') || '[]')
    const user = savedUsers.find((entry) => entry.email === email && entry.password === password)

    if (!user) {
      throw new Error('Invalid email or password')
    }

    const sessionUser = { id: user.id, name: user.name, email: user.email }
    localStorage.setItem('taskflow_user', JSON.stringify(sessionUser))
    setCurrentUser(sessionUser)
    setIsAuthenticated(true)
    return sessionUser
  }

  const signup = (name, email, password) => {
    const savedUsers = JSON.parse(localStorage.getItem('taskflow_users') || '[]')
    if (savedUsers.some((entry) => entry.email === email)) {
      throw new Error('User already exists')
    }

    const newUser = { id: crypto.randomUUID(), name, email, password }
    savedUsers.push(newUser)
    localStorage.setItem('taskflow_users', JSON.stringify(savedUsers))

    const sessionUser = { id: newUser.id, name: newUser.name, email: newUser.email }
    localStorage.setItem('taskflow_user', JSON.stringify(sessionUser))
    setCurrentUser(sessionUser)
    setIsAuthenticated(true)
    return sessionUser
  }

  const logout = () => {
    localStorage.removeItem('taskflow_user')
    setCurrentUser(null)
    setIsAuthenticated(false)
  }

  const value = useMemo(() => ({ currentUser, isAuthenticated, login, signup, logout }), [currentUser, isAuthenticated])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
