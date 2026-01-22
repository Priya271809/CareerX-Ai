import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Layout from './components/Layout'
import Home from './components/Home'
import ResumeOptimizer from './components/ResumeOptimizer'
import JobRecommender from './components/JobRecommender'
import InterviewAssistant from './components/InterviewAssistant'
import About from './components/About'
import Login from './components/Login'
import Signup from './components/Signup'
import Profile from './components/Profile'
import Messages from './components/Messages'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/*" element={
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/resume-optimizer" element={<ResumeOptimizer />} />
                <Route path="/job-recommender" element={<JobRecommender />} />
                <Route path="/interview-assistant" element={<InterviewAssistant />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </Layout>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
