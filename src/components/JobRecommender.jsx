import React, { useState } from 'react'

function JobRecommender() {
  const [showForm, setShowForm] = useState(false)
  const [preferences, setPreferences] = useState({
    skills: '',
    location: '',
    salary: '',
    jobType: 'full-time'
  })
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState([])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setPreferences(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFindJobs = () => {
    if (!showForm) {
      setShowForm(true)
      return
    }

    if (!preferences.skills.trim()) {
      alert('Please enter your skills')
      return
    }

    setIsSearching(true)

    // Simulate job search
    setTimeout(() => {
      const mockJobs = [
        {
          id: 1,
          title: 'Senior Software Engineer',
          company: 'TechCorp Inc.',
          location: preferences.location || 'Remote',
          salary: '$120k - $150k',
          match: '95%'
        },
        {
          id: 2,
          title: 'Full Stack Developer',
          company: 'StartupXYZ',
          location: preferences.location || 'New York, NY',
          salary: '$90k - $120k',
          match: '88%'
        },
        {
          id: 3,
          title: 'React Developer',
          company: 'InnovateLabs',
          location: preferences.location || 'San Francisco, CA',
          salary: '$100k - $130k',
          match: '82%'
        }
      ]
      setSearchResults(mockJobs)
      setIsSearching(false)
    }, 2000)
  }

  const handleApply = (jobId) => {
    alert(`Application started for job ${jobId}`)
  }

  return (
    <div className="min-h-screen bg-green-50 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-4xl font-bold text-center text-green-800 mb-6">Job Recommender</h3>
          <p className="text-xl text-center text-gray-600 mb-12">Find the perfect job matches tailored to your skills and preferences.</p>

          {!showForm ? (
            <div className="bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/50">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="text-center">
                  <button
                    onClick={handleFindJobs}
                    className="bg-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-green-700 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    Find Jobs
                  </button>
                </div>
                <div>
                  <h4 className="text-2xl font-semibold text-green-800 mb-4">Smart Matching</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>Skill-based recommendations</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>Location and salary preferences</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>Company culture matching</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>Growth opportunity analysis</li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/50">
                <h4 className="text-2xl font-semibold text-green-800 mb-6 text-center">Tell us about your preferences</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Skills (comma separated)</label>
                    <input
                      type="text"
                      name="skills"
                      value={preferences.skills}
                      onChange={handleInputChange}
                      placeholder="e.g., React, JavaScript, Node.js"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Preferred Location</label>
                    <input
                      type="text"
                      name="location"
                      value={preferences.location}
                      onChange={handleInputChange}
                      placeholder="e.g., New York, Remote"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Salary Range</label>
                    <input
                      type="text"
                      name="salary"
                      value={preferences.salary}
                      onChange={handleInputChange}
                      placeholder="e.g., $80k - $120k"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Job Type</label>
                    <select
                      name="jobType"
                      value={preferences.jobType}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="full-time">Full-time</option>
                      <option value="part-time">Part-time</option>
                      <option value="contract">Contract</option>
                      <option value="remote">Remote</option>
                    </select>
                  </div>
                </div>
                <div className="text-center mt-6">
                  <button
                    onClick={handleFindJobs}
                    disabled={isSearching}
                    className="bg-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-green-700 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSearching ? 'Searching...' : 'Find My Perfect Jobs'}
                  </button>
                </div>
              </div>

              {searchResults.length > 0 && (
                <div className="bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/50">
                  <h4 className="text-2xl font-semibold text-green-800 mb-6 text-center">Recommended Jobs</h4>
                  <div className="space-y-4">
                    {searchResults.map(job => (
                      <div key={job.id} className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl border border-green-200/50 hover:shadow-lg transition duration-300">
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="text-xl font-semibold text-green-800">{job.title}</h5>
                            <p className="text-gray-600">{job.company} • {job.location}</p>
                            <p className="text-gray-600">{job.salary}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-green-600 font-bold text-lg">{job.match} match</div>
                            <button
                              onClick={() => handleApply(job.id)}
                              className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition duration-300 mt-2"
                            >
                              Apply Now
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default JobRecommender
