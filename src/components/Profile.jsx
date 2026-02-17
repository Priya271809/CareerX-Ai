import React, { useState, useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function Profile() {
  const { currentUser, updateUser } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    location: '',
    currentPosition: '',
    experience: '',
    skills: '',
    education: '',
    linkedinUrl: '',
    githubUrl: ''
  })
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  useLayoutEffect(() => {
    if (!currentUser) {
      navigate('/login')
      return
    }

    // Load profile data from localStorage or initialize with user data
    const profileData = localStorage.getItem(`careerxai-profile-${currentUser.id}`)
    if (profileData) {
      setFormData(JSON.parse(profileData))
    } else {
      setFormData({
        name: currentUser.name,
        email: currentUser.email,
        bio: '',
        location: '',
        currentPosition: '',
        experience: '',
        skills: '',
        education: '',
        linkedinUrl: '',
        githubUrl: ''
      })
    }
  }, [currentUser, navigate])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name) newErrors.name = 'Name is required'
    if (!formData.email) newErrors.email = 'Email is required'
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validateForm()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    // Save profile data
    localStorage.setItem(`careerxai-profile-${currentUser.id}`, JSON.stringify(formData))

    // Update user name in currentUser if changed
    if (formData.name !== currentUser.name) {
      const updatedUser = { ...currentUser, name: formData.name }
      updateUser(updatedUser)
    }

    setIsEditing(false)
    setErrors({})
  }

  const handleCancel = () => {
    // Reload original data
    const profileData = localStorage.getItem(`careerxai-profile-${currentUser.id}`)
    if (profileData) {
      setFormData(JSON.parse(profileData))
    } else {
      setFormData({
        name: currentUser.name,
        email: currentUser.email,
        bio: '',
        location: '',
        currentPosition: '',
        experience: '',
        skills: '',
        education: '',
        linkedinUrl: '',
        githubUrl: ''
      })
    }
    setIsEditing(false)
    setErrors({})
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg"></span>
          <p className="mt-4">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-base-200 py-10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Profile Card */}
          <div className="card bg-base-100 shadow-xl">
            {/* Cover & Avatar */}
            <div className="bg-primary h-32 relative">
              <div className="absolute -bottom-16 left-8">
                <div className="avatar placeholder">
                  <div className="bg-primary-content text-primary rounded-full w-32 ring ring-primary">
                    <span className="text-4xl font-bold">{formData.name.charAt(0).toUpperCase()}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-body pt-20">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-3xl font-bold">{formData.name}</h1>
                  <p className="text-lg opacity-70">{formData.currentPosition || 'Professional'}</p>
                  <p className="opacity-60">{formData.location}</p>
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="btn btn-primary"
                >
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
              </div>

              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Full Name</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`input input-bordered ${errors.name ? 'input-error' : ''}`}
                        placeholder="Your full name"
                      />
                      {errors.name && (
                        <label className="label">
                          <span className="label-text-alt text-error">{errors.name}</span>
                        </label>
                      )}
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Email</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`input input-bordered ${errors.email ? 'input-error' : ''}`}
                        placeholder="your.email@example.com"
                      />
                      {errors.email && (
                        <label className="label">
                          <span className="label-text-alt text-error">{errors.email}</span>
                        </label>
                      )}
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Location</span>
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="input input-bordered"
                        placeholder="City, Country"
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Current Position</span>
                      </label>
                      <input
                        type="text"
                        name="currentPosition"
                        value={formData.currentPosition}
                        onChange={handleChange}
                        className="input input-bordered"
                        placeholder="Software Engineer at Company"
                      />
                    </div>

                    <div className="form-control md:col-span-2">
                      <label className="label">
                        <span className="label-text">Bio</span>
                      </label>
                      <textarea
                        name="bio"
                        rows={3}
                        value={formData.bio}
                        onChange={handleChange}
                        className="textarea textarea-bordered"
                        placeholder="Tell us about yourself..."
                      />
                    </div>

                    <div className="form-control md:col-span-2">
                      <label className="label">
                        <span className="label-text">Experience</span>
                      </label>
                      <textarea
                        name="experience"
                        rows={4}
                        value={formData.experience}
                        onChange={handleChange}
                        className="textarea textarea-bordered"
                        placeholder="Your professional experience..."
                      />
                    </div>

                    <div className="form-control md:col-span-2">
                      <label className="label">
                        <span className="label-text">Skills</span>
                      </label>
                      <input
                        type="text"
                        name="skills"
                        value={formData.skills}
                        onChange={handleChange}
                        className="input input-bordered"
                        placeholder="JavaScript, React, Node.js, etc. (comma-separated)"
                      />
                    </div>

                    <div className="form-control md:col-span-2">
                      <label className="label">
                        <span className="label-text">Education</span>
                      </label>
                      <textarea
                        name="education"
                        rows={3}
                        value={formData.education}
                        onChange={handleChange}
                        className="textarea textarea-bordered"
                        placeholder="Your educational background..."
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">LinkedIn URL</span>
                      </label>
                      <input
                        type="url"
                        name="linkedinUrl"
                        value={formData.linkedinUrl}
                        onChange={handleChange}
                        className="input input-bordered"
                        placeholder="https://linkedin.com/in/yourprofile"
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">GitHub URL</span>
                      </label>
                      <input
                        type="url"
                        name="githubUrl"
                        value={formData.githubUrl}
                        onChange={handleChange}
                        className="input input-bordered"
                        placeholder="https://github.com/yourusername"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="btn btn-ghost"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  {formData.bio && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2">About</h3>
                      <p className="opacity-70">{formData.bio}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {formData.experience && (
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Experience</h3>
                        <p className="opacity-70 whitespace-pre-line">{formData.experience}</p>
                      </div>
                    )}

                    {formData.skills && (
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Skills</h3>
                        <div className="flex flex-wrap gap-2">
                          {formData.skills.split(',').map((skill, index) => (
                            <div key={index} className="badge badge-primary">{skill.trim()}</div>
                          ))}
                        </div>
                      </div>
                    )}

                    {formData.education && (
                      <div className="md:col-span-2">
                        <h3 className="text-lg font-semibold mb-2">Education</h3>
                        <p className="opacity-70 whitespace-pre-line">{formData.education}</p>
                      </div>
                    )}

                    {(formData.linkedinUrl || formData.githubUrl) && (
                      <div className="md:col-span-2">
                        <h3 className="text-lg font-semibold mb-2">Links</h3>
                        <div className="flex space-x-4">
                          {formData.linkedinUrl && (
                            <a
                              href={formData.linkedinUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-outline btn-sm"
                            >
                              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                              </svg>
                              LinkedIn
                            </a>
                          )}
                          {formData.githubUrl && (
                            <a
                              href={formData.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-outline btn-sm"
                            >
                              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                              </svg>
                              GitHub
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
