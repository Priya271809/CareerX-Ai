import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function Layout({ children }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { currentUser, logout } = useAuth()

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isProfileSettingsOpen, setIsProfileSettingsOpen] = useState(false)


  const [showChangePassword, setShowChangePassword] = useState(false)
  const [showPrivacySettings, setShowPrivacySettings] = useState(false)
  const [showDataExport, setShowDataExport] = useState(false)

  const [settings, setSettings] = useState({
    darkMode: false,
    notifications: true,
    language: 'en',
    fontSize: 'medium'
  })

  const profileRef = useRef(null)


  useEffect(() => {
    try {
      const saved = localStorage.getItem('careerxai-settings')
      if (saved) {
        const parsed = JSON.parse(saved)
        setSettings(parsed)
        if (parsed.darkMode) {
          document.documentElement.classList.add('dark')
        }
      }
    } catch (e) {
      console.warn('Failed to load settings:', e)
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem('careerxai-settings', JSON.stringify(settings))
    } catch (e) {
      console.warn('Failed to save settings:', e)
    }
  }, [settings])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isProfileOpen && profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false)
        setIsProfileSettingsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isProfileOpen])

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }))
    if (key === 'darkMode') {
      if (value) document.documentElement.classList.add('dark')
      else document.documentElement.classList.remove('dark')
    }
  }

  const toggleProfile = () => {
    setIsProfileOpen(prev => !prev)
    setIsProfileSettingsOpen(false)
  }

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/login')
    } catch (err) {
      navigate('/login')
    }
  }

  const userName = (currentUser && (currentUser.name || currentUser.displayName || currentUser.email)) || 'Profile'

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-white">

        {/* Navbar */}
        <nav className="fixed top-0 left-0 right-0 z-50">
          <div className="backdrop-blur-md bg-black border-b border-gray-200 shadow-sm">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">

              {/* Logo */}
              <Link to="/" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-600 to-green-400 flex items-center justify-center shadow-md">
                  <span className="text-white font-bold">CX</span>
                </div>
                <span className="text-lg font-semibold text-white">CareerX-AI</span>
              </Link>

              {/* Global Search */}
              <div className="hidden md:flex flex-1 max-w-md mx-6">
                <input
                  type="text"
                  placeholder="Search jobs, people, companies"
                  className="w-full px-4 py-2 rounded-full bg-white text-gray-800 border-2 border-transparent focus:border-green-500 focus:outline-none transition-colors"
                />
              </div>

              {/* Desktop Nav */}
              <ul className="hidden md:flex items-center gap-6">
                {[
                  { to: "/", label: "Home" },
                  { to: "/resume-optimizer", label: "Resume Optimizer" },
                  { to: "/job-recommender", label: "Job Recommender" },
                  { to: "/interview-assistant", label: "Interview Assistant" },
                  { to: "/about", label: "About" }
                ].map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className={`font-medium transition text-white ${
                        location.pathname === item.to
                          ? 'text-blue-300'
                          : 'hover:text-blue-300'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Messaging */}
              <Link
                to="/messages"
                className="w-10 h-10 rounded-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center font-semibold text-lg transition-colors relative"
              >
                💬
                <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
              </Link>

              {/* Profile */}
              <div ref={profileRef} className="relative">
                <button
                  onClick={toggleProfile}
                  className="w-10 h-10 rounded-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center font-semibold text-lg transition-colors"
                >
                  {userName[0].toUpperCase()}
                </button>

                {isProfileOpen && (
                  <div className={`absolute right-0 mt-2 ${isProfileSettingsOpen ? 'w-72' : 'w-64'} bg-green-50 dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50`}>
                    <div className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold text-lg">
                          {userName[0].toUpperCase()}
                        </div>
                        <div>
                          <div className="font-medium text-green-800 dark:text-gray-200">{userName}</div>
                          <div className="text-xs text-green-600 dark:text-gray-400">{currentUser?.email}</div>
                        </div>
                      </div>

                      <div className="mt-3 space-y-1">

                        {/* Menu */}
                        <Link to="/profile" onClick={() => setIsProfileOpen(false)} className="block p-2 text-white rounded hover:bg-green-100 dark:hover:bg-gray-700 transition-colors">Home</Link>
                        <Link to="/applications" onClick={() => setIsProfileOpen(false)} className="block p-2 text-white rounded hover:bg-green-100 dark:hover:bg-gray-700 transition-colors">My Applications</Link>
                        <Link to="/bookmarks" onClick={() => setIsProfileOpen(false)} className="block p-2 text-white rounded hover:bg-green-100 dark:hover:bg-gray-700 transition-colors">My Bookmarks</Link>
                        <Link to="/edit-resume" onClick={() => setIsProfileOpen(false)} className="block p-2 text-white rounded hover:bg-green-100 dark:hover:bg-gray-700 transition-colors">Edit Resume</Link>

                        {/* Settings */}
                        <button onClick={() => setIsProfileSettingsOpen(!isProfileSettingsOpen)} className="w-full p-2 text-left text-white rounded hover:bg-green-100 dark:hover:bg-gray-700 transition-colors">
                          ⚙️ Settings
                        </button>

                        {/* Logout */}
                        <button onClick={handleLogout} className="w-full text-left p-2 text-red-600 rounded hover:bg-green-100 dark:hover:bg-gray-700 transition-colors">
                          Logout
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Toggle */}
              <button onClick={() => setIsMenuOpen(prev => !prev)} className="md:hidden px-3 py-2 rounded-md">
                ☰
              </button>

            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pt-20 bg-white/70 dark:bg-black/50 border-b">
            <div className="container mx-auto px-4 py-4">
              <ul className="space-y-3">
                <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
                <li><Link to="/resume-optimizer" onClick={() => setIsMenuOpen(false)}>Resume Optimizer</Link></li>
                <li><Link to="/job-recommender" onClick={() => setIsMenuOpen(false)}>Job Recommender</Link></li>
                <li><Link to="/interview-assistant" onClick={() => setIsMenuOpen(false)}>Interview Assistant</Link></li>
                <li><Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link></li>

                {currentUser ? (
                  <li>
                    <button className="text-red-600" onClick={() => { setIsMenuOpen(false); handleLogout() }}>
                      Logout
                    </button>
                  </li>
                ) : (
                  <>
                    <li><Link to="/login">Sign In</Link></li>
                    <li><Link to="/signup">Sign Up</Link></li>
                  </>
                )}
              </ul>
            </div>
          </div>
        )}

        {/* Main */}
        <main className="pt-20 container mx-auto px-4">
          <div className={
            settings.fontSize === 'small' ? 'text-sm' :
            settings.fontSize === 'large' ? 'text-lg' :
            'text-base'
          }>
            {children}
          </div>
        </main>

      </div>
    </>
  )
}

export default Layout
