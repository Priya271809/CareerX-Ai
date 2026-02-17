import React from 'react'
import { Link } from 'react-router-dom'

function About() {
  return (
    <div className="min-h-screen bg-base-200 py-10">
      <div className="container mx-auto px-4">
        <h3 className="text-4xl font-bold text-center mb-12">About CareerX-AI</h3>
        
        <div className="max-w-6xl mx-auto">
          {/* Hero Card */}
          <div className="card bg-base-100 shadow-xl mb-12">
            <div className="card-body text-center">
              <p className="text-xl mb-6">
                CareerX-AI is revolutionizing career guidance by leveraging cutting-edge artificial intelligence to provide personalized career advice, skill assessments, and job matching services.
              </p>
              <p className="text-lg opacity-70">
                Our platform analyzes your skills, interests, and market trends to help you make informed decisions about your professional future.
              </p>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* For Job Seekers */}
            <div className="card bg-primary text-primary-content shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="card-body">
                <h4 className="card-title text-2xl justify-center mb-4">For Job Seekers</h4>
                <ul className="space-y-3">
                  <li className="flex items-center"><span className="badge badge-secondary mr-2">✓</span>Personalized resume optimization</li>
                  <li className="flex items-center"><span className="badge badge-secondary mr-2">✓</span>AI-powered job recommendations</li>
                  <li className="flex items-center"><span className="badge badge-secondary mr-2">✓</span>Interview preparation tools</li>
                  <li className="flex items-center"><span className="badge badge-secondary mr-2">✓</span>Career path guidance</li>
                  <li className="flex items-center"><span className="badge badge-secondary mr-2">✓</span>Skill gap analysis</li>
                </ul>
              </div>
            </div>

            {/* For Professionals */}
            <div className="card bg-secondary text-secondary-content shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="card-body">
                <h4 className="card-title text-2xl justify-center mb-4">For Professionals</h4>
                <ul className="space-y-3">
                  <li className="flex items-center"><span className="badge badge-primary mr-2">✓</span>Career advancement planning</li>
                  <li className="flex items-center"><span className="badge badge-primary mr-2">✓</span>Industry trend insights</li>
                  <li className="flex items-center"><span className="badge badge-primary mr-2">✓</span>Networking opportunities</li>
                  <li className="flex items-center"><span className="badge badge-primary mr-2">✓</span>Leadership development</li>
                  <li className="flex items-center"><span className="badge badge-primary mr-2">✓</span>Salary negotiation tips</li>
                </ul>
              </div>
            </div>

            {/* For Students */}
            <div className="card bg-accent text-accent-content shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="card-body">
                <h4 className="card-title text-2xl justify-center mb-4">For Students</h4>
                <ul className="space-y-3">
                  <li className="flex items-center"><span className="badge badge-neutral mr-2">✓</span>Major and career exploration</li>
                  <li className="flex items-center"><span className="badge badge-neutral mr-2">✓</span>Internship matching</li>
                  <li className="flex items-center"><span className="badge badge-neutral mr-2">✓</span>Academic planning</li>
                  <li className="flex items-center"><span className="badge badge-neutral mr-2">✓</span>Skill building roadmaps</li>
                  <li className="flex items-center"><span className="badge badge-neutral mr-2">✓</span>Future job market predictions</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="text-center mb-8">
            <h4 className="text-3xl font-bold mb-6">Why Choose CareerX-AI?</h4>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition duration-300">
                <figure className="px-10 pt-10">
                  <div className="text-5xl">🤖</div>
                </figure>
                <div className="card-body items-center text-center">
                  <h5 className="card-title">AI-Powered</h5>
                  <p className="opacity-70 text-sm">Advanced algorithms for accurate recommendations</p>
                </div>
              </div>
              
              <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition duration-300">
                <figure className="px-10 pt-10">
                  <div className="text-5xl">🎯</div>
                </figure>
                <div className="card-body items-center text-center">
                  <h5 className="card-title">Personalized</h5>
                  <p className="opacity-70 text-sm">Tailored advice based on your unique profile</p>
                </div>
              </div>
              
              <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition duration-300">
                <figure className="px-10 pt-10">
                  <div className="text-5xl">📊</div>
                </figure>
                <div className="card-body items-center text-center">
                  <h5 className="card-title">Data-Driven</h5>
                  <p className="opacity-70 text-sm">Insights from millions of career data points</p>
                </div>
              </div>
              
              <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition duration-300">
                <figure className="px-10 pt-10">
                  <div className="text-5xl">🚀</div>
                </figure>
                <div className="card-body items-center text-center">
                  <h5 className="card-title">Always Updated</h5>
                  <p className="opacity-70 text-sm">Real-time market trends and opportunities</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="card bg-primary text-primary-content shadow-xl">
            <div className="card-body text-center">
              <h4 className="card-title text-2xl justify-center">Ready to Get Started?</h4>
              <p className="opacity-90 mb-4">Join thousands of professionals who have accelerated their careers with CareerX-AI.</p>
              <div className="card-actions justify-center">
                <Link to="/signup" className="btn btn-secondary">Sign Up Free</Link>
                <Link to="/login" className="btn btn-outline">Sign In</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
