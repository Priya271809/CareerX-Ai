import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function Layout({ children }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { currentUser, logout } = useAuth()

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)

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
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isProfileOpen])

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false)
  }, [location.pathname])

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const toggleProfile = () => {
    setIsProfileOpen(prev => !prev)
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

  const isActive = (path) => location.pathname === path

  return (
    <div className="app-container">
      {/* Navbar */}
      <header className="header">
        <div className="header-container">
          {/* Left Section - Logo & Mobile Menu */}
          <div className="header-left">
            <button 
              className="mobile-menu-btn" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="menu-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <Link to="/" className="logo-link">
              <div className="logo-icon">
                <span className="logo-text">CX</span>
              </div>
              <span className="logo-name">CareerX-AI</span>
            </Link>
          </div>

          {/* Center Section - Desktop Navigation */}
          <nav className="header-nav">
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
            >
              Home
            </Link>
            <Link 
              to="/resume-optimizer" 
              className={`nav-link ${isActive('/resume-optimizer') ? 'active' : ''}`}
            >
              Resume
            </Link>
            <Link 
              to="/job-recommender" 
              className={`nav-link ${isActive('/job-recommender') ? 'active' : ''}`}
            >
              Jobs
            </Link>
            <Link 
              to="/interview-assistant" 
              className={`nav-link ${isActive('/interview-assistant') ? 'active' : ''}`}
            >
              Interview
            </Link>
            <Link 
              to="/about" 
              className={`nav-link ${isActive('/about') ? 'active' : ''}`}
            >
              About
            </Link>
          </nav>

          {/* Right Section - Actions */}
          <div className="header-right">
            {/* Search - Desktop Only */}
            <div className="search-container">
              <svg xmlns="http://www.w3.org/2000/svg" className="search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search jobs, companies..."
                className="search-input"
              />
            </div>

            {/* Messages Icon */}
            <Link
              to="/messages"
              className="icon-btn message-btn"
              aria-label="Messages"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <span className="notification-badge">3</span>
            </Link>

            {/* Auth Buttons or Profile */}
            {currentUser ? (
              <div ref={profileRef} className="profile-dropdown">
                <button 
                  className="profile-btn" 
                  onClick={toggleProfile}
                  aria-label="Profile menu"
                >
                  <div className="profile-avatar">
                    <span>{userName[0].toUpperCase()}</span>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" className={`chevron-icon ${isProfileOpen ? 'open' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {isProfileOpen && (
                  <div className="dropdown-menu">
                    <div className="dropdown-header">
                      <span className="dropdown-name">{userName}</span>
                      <span className="dropdown-email">{currentUser?.email}</span>
                    </div>
                    <div className="dropdown-divider"></div>
                    <Link to="/profile" className="dropdown-item">
                      <svg xmlns="http://www.w3.org/2000/svg" className="dropdown-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Profile
                    </Link>
                    <Link to="/settings" className="dropdown-item">
                      <svg xmlns="http://www.w3.org/2000/svg" className="dropdown-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Settings
                    </Link>
                    <div className="dropdown-divider"></div>
                    <button onClick={handleLogout} className="dropdown-item logout">
                      <svg xmlns="http://www.w3.org/2000/svg" className="dropdown-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="btn btn-ghost">Sign In</Link>
                <Link to="/signup" className="btn btn-primary">Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {isMenuOpen && (
        <div className="sidebar-overlay" onClick={() => setIsMenuOpen(false)}></div>
      )}

      {/* Mobile Sidebar */}
      <aside className={`sidebar ${isMenuOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <Link to="/" className="logo-link" onClick={() => setIsMenuOpen(false)}>
            <div className="logo-icon">
              <span className="logo-text">CX</span>
            </div>
            <span className="logo-name">CareerX-AI</span>
          </Link>
          <button className="close-btn" onClick={() => setIsMenuOpen(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <nav className="sidebar-nav">
          <Link 
            to="/" 
            className={`sidebar-link ${isActive('/') ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="sidebar-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Home
          </Link>
          <Link 
            to="/resume-optimizer" 
            className={`sidebar-link ${isActive('/resume-optimizer') ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="sidebar-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Resume Optimizer
          </Link>
          <Link 
            to="/job-recommender" 
            className={`sidebar-link ${isActive('/job-recommender') ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="sidebar-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Job Recommender
          </Link>
          <Link 
            to="/interview-assistant" 
            className={`sidebar-link ${isActive('/interview-assistant') ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="sidebar-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
            </svg>
            Interview Assistant
          </Link>
          <Link 
            to="/about" 
            className={`sidebar-link ${isActive('/about') ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="sidebar-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            About
          </Link>
          <Link 
            to="/messages" 
            className={`sidebar-link ${isActive('/messages') ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="sidebar-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            Messages
          </Link>
        </nav>

        <div className="sidebar-footer">
          {currentUser ? (
            <button 
              className="sidebar-link logout-btn" 
              onClick={() => { setIsMenuOpen(false); handleLogout() }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="sidebar-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          ) : (
            <div className="sidebar-auth">
              <Link to="/login" className="sidebar-link" onClick={() => setIsMenuOpen(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="sidebar-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Sign In
              </Link>
              <Link to="/signup" className="sidebar-link active" onClick={() => setIsMenuOpen(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="sidebar-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <div className="content-wrapper">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-brand">
            <Link to="/" className="logo-link">
              <div className="logo-icon">
                <span className="logo-text">CX</span>
              </div>
            </Link>
            <p className="footer-tagline">Your AI-powered career companion</p>
          </div>
          <div className="footer-links">
            <Link to="/about">About</Link>
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <p className="footer-copyright">© 2024 CareerX-AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Layout
