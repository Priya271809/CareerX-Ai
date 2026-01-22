import React, { createContext, useContext, useState, useLayoutEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useLayoutEffect(() => {
    const user = localStorage.getItem('careerxai-currentUser')
    if (user) {
      setCurrentUser(JSON.parse(user))
    }
    setLoading(false)
  }, [])

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('careerxai-users') || '[]')
    const user = users.find(u => u.email === email && u.password === password)
    if (user) {
      localStorage.setItem('careerxai-currentUser', JSON.stringify(user))
      setCurrentUser(user)
      return true
    }
    return false
  }

  const logout = () => {
    localStorage.removeItem('careerxai-currentUser')
    setCurrentUser(null)
  }

  const updateUser = (updatedUser) => {
    localStorage.setItem('careerxai-currentUser', JSON.stringify(updatedUser))
    setCurrentUser(updatedUser)
  }

  const value = {
    currentUser,
    login,
    logout,
    updateUser,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
