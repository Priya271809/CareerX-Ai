import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Home() {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const user = localStorage.getItem('careerxai-currentUser')
    if (user) {
      setCurrentUser(JSON.parse(user))
    }
  }, [])

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
      {/* Hero Section */}
      <section style={{ 
        background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', 
        color: 'white', 
        padding: '6rem 1rem', 
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center', maxWidth: '56rem' }}>
          <div style={{ maxWidth: '48rem', margin: '0 auto' }}>
            <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1.5rem', lineHeight: '1.2' }}>Unlock Your Career Potential with AI</h1>
            <p style={{ fontSize: '1.25rem', marginBottom: '2rem', opacity: 0.9 }}>Discover personalized career paths, skill recommendations, and job opportunities powered by advanced AI technology.</p>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
              <span className="badge badge-lg">AI-Powered</span>
              <span className="badge badge-lg">ATS-Friendly</span>
              <span className="badge badge-lg">Career Guidance</span>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'center' }}>
              {currentUser ? (
                <>
                  <Link to="/profile" className="btn btn-secondary btn-lg">View Profile</Link>
                  <Link to="/resume-optimizer" className="btn btn-outline btn-lg" style={{ color: 'white', border: '2px solid white' }}>Get Started</Link>
                </>
              ) : (
                <>
                  <Link to="/signup" className="btn btn-secondary btn-lg">Join Now</Link>
                  <Link to="/login" className="btn btn-outline btn-lg" style={{ color: 'white', border: '2px solid white' }}>Sign In</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section style={{ padding: '5rem 1rem', backgroundColor: '#F9FAFB' }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1rem' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '3rem', color: '#1F2937' }}>Why Choose CareerX-AI?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            <div className="card">
              <div style={{ padding: '2.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎯</div>
                <div style={{ padding: '1.5rem', textAlign: 'center' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', color: '#1F2937' }}>AI Job Recommendations</h3>
                  <p style={{ color: '#6B7280' }}>Get personalized job matches based on your skills and preferences.</p>
                </div>
              </div>
            </div>
            <div className="card">
              <div style={{ padding: '2.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📄</div>
                <div style={{ padding: '1.5rem', textAlign: 'center' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', color: '#1F2937' }}>ATS Resume Optimizer</h3>
                  <p style={{ color: '#6B7280' }}>Optimize your resume to pass ATS filters and impress recruiters.</p>
                </div>
              </div>
            </div>
            <div className="card">
              <div style={{ padding: '2.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💬</div>
                <div style={{ padding: '1.5rem', textAlign: 'center' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', color: '#1F2937' }}>Interview Assistant</h3>
                  <p style={{ color: '#6B7280' }}>Practice interviews with AI-powered feedback and tips.</p>
                </div>
              </div>
            </div>
            <div className="card">
              <div style={{ padding: '2.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🗺️</div>
                <div style={{ padding: '1.5rem', textAlign: 'center' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', color: '#1F2937' }}>Career Roadmap</h3>
                  <p style={{ color: '#6B7280' }}>Plan your career journey with personalized guidance.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section style={{ padding: '4rem 1rem', backgroundColor: '#FFFFFF' }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1rem' }}>
          <div className="stats" style={{ width: '100%' }}>
            <div className="stat">
              <div className="stat-title">Active Users</div>
              <div className="stat-value" style={{ color: '#10B981' }}>10K+</div>
              <div className="stat-desc">And growing</div>
            </div>
            <div className="stat">
              <div className="stat-title">AI-Powered</div>
              <div className="stat-value" style={{ color: '#10B981' }}>100%</div>
              <div className="stat-desc">Career Guidance</div>
            </div>
            <div className="stat">
              <div className="stat-title">Success Rate</div>
              <div className="stat-value" style={{ color: '#10B981' }}>95%</div>
              <div className="stat-desc">Of users get hired</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call-To-Action */}
      <section style={{ padding: '5rem 1rem', background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', color: 'white', textAlign: 'center' }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1rem' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Ready to Transform Your Career?</h2>
          <p style={{ fontSize: '1.25rem', marginBottom: '2rem', maxWidth: '42rem', margin: '0 auto 2rem', opacity: 0.9 }}>Join thousands of professionals who have accelerated their careers with CareerX-AI.</p>
          <Link to="/signup" className="btn btn-secondary btn-lg">Start Your Journey</Link>
        </div>
      </section>
    </div>
  )
}

export default Home
