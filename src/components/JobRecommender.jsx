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
    <div className="min-h-screen bg-base-200 py-10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-4xl font-bold text-center mb-6">Job Recommender</h3>
          <p className="text-xl text-center opacity-70 mb-12">Find the perfect job matches tailored to your skills and preferences.</p>

          {!showForm ? (
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="text-center">
                    <button
                      onClick={handleFindJobs}
                      className="btn btn-primary btn-lg"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      Find Jobs
                    </button>
                  </div>
                  <div>
                    <h4 className="text-2xl font-semibold mb-4">Smart Matching</h4>
                    <ul className="space-y-3">
                      <li className="flex items-center"><span className="badge badge-primary mr-2">✓</span>Skill-based recommendations</li>
                      <li className="flex items-center"><span className="badge badge-primary mr-2">✓</span>Location and salary preferences</li>
                      <li className="flex items-center"><span className="badge badge-primary mr-2">✓</span>Company culture matching</li>
                      <li className="flex items-center"><span className="badge badge-primary mr-2">✓</span>Growth opportunity analysis</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Preferences Form */}
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h4 className="card-title text-2xl justify-center mb-6">Tell us about your preferences</h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Skills (comma separated)</span>
                      </label>
                      <input
                        type="text"
                        name="skills"
                        value={preferences.skills}
                        onChange={handleInputChange}
                        placeholder="e.g., React, JavaScript, Node.js"
                        className="input input-bordered"
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Preferred Location</span>
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={preferences.location}
                        onChange={handleInputChange}
                        placeholder="e.g., New York, Remote"
                        className="input input-bordered"
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Salary Range</span>
                      </label>
                      <input
                        type="text"
                        name="salary"
                        value={preferences.salary}
                        onChange={handleInputChange}
                        placeholder="e.g., $80k - $120k"
                        className="input input-bordered"
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Job Type</span>
                      </label>
                      <select
                        name="jobType"
                        value={preferences.jobType}
                        onChange={handleInputChange}
                        className="select select-bordered"
                      >
                        <option value="full-time">Full-time</option>
                        <option value="part-time">Part-time</option>
                        <option value="contract">Contract</option>
                        <option value="remote">Remote</option>
                      </select>
                    </div>
                  </div>
                  <div className="card-actions justify-center mt-6">
                    <button
                      onClick={handleFindJobs}
                      disabled={isSearching}
                      className="btn btn-primary btn-lg"
                    >
                      {isSearching ? (
                        <>
                          <span className="loading loading-spinner"></span>
                          Searching...
                        </>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                          Find My Perfect Jobs
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Search Results */}
              {searchResults.length > 0 && (
                <div className="card bg-base-100 shadow-xl">
                  <div className="card-body">
                    <h4 className="card-title text-2xl justify-center mb-6">Recommended Jobs</h4>
                    <div className="space-y-4">
                      {searchResults.map(job => (
                        <div key={job.id} className="card bg-base-200 shadow hover:shadow-lg transition duration-300">
                          <div className="card-body flex flex-row items-center justify-between">
                            <div>
                              <h5 className="card-title text-xl">{job.title}</h5>
                              <p className="opacity-70">{job.company} • {job.location}</p>
                              <p className="opacity-70">{job.salary}</p>
                            </div>
                            <div className="text-right">
                              <div className="badge badge-lg badge-primary font-bold">{job.match} match</div>
                              <button
                                onClick={() => handleApply(job.id)}
                                className="btn btn-primary mt-3"
                              >
                                Apply Now
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
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
