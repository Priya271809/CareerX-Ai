import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()
  const { signup } = useAuth()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.firstName) newErrors.firstName = 'First name is required'
    if (!formData.lastName) newErrors.lastName = 'Last name is required'
    if (!formData.email) newErrors.email = 'Email is required'
    if (!formData.password) newErrors.password = 'Password is required'
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match'
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters'

    // Check if email already exists
    const users = JSON.parse(localStorage.getItem('careerxai-users') || '[]')
    if (users.some(u => u.email === formData.email)) {
      newErrors.email = 'Email already exists'
    }

    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validateForm()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    const newUser = {
      id: Date.now(),
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      password: formData.password
    }

    signup(newUser)
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center py-12 px-4">
      {/* Fixed Header */}
      <div className="navbar bg-base-100 fixed top-0 left-0 right-0 z-50 shadow">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-content font-bold">CX</span>
            </div>
            <span className="ml-2">CareerX-AI</span>
          </Link>
        </div>
      </div>

      <div className="card w-full max-w-md shadow-2xl bg-base-100 mt-20">
        <div className="card-body">
          <div className="text-center mb-6">
            <h2 className="card-title text-3xl font-bold justify-center">Join CareerX-AI</h2>
            <p className="text-base-content/70 mt-2">Make the most of your professional life</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">First Name</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  className={`input input-bordered ${errors.firstName ? 'input-error' : ''}`}
                  value={formData.firstName}
                  onChange={handleChange}
                />
                {errors.firstName && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.firstName}</span>
                  </label>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Last Name</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  className={`input input-bordered ${errors.lastName ? 'input-error' : ''}`}
                  value={formData.lastName}
                  onChange={handleChange}
                />
                {errors.lastName && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.lastName}</span>
                  </label>
                )}
              </div>
            </div>

            {/* Email Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className={`input input-bordered ${errors.email ? 'input-error' : ''}`}
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.email}</span>
                </label>
              )}
            </div>

            {/* Password Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password (6+ characters)</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className={`input input-bordered ${errors.password ? 'input-error' : ''}`}
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.password}</span>
                </label>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                className={`input input-bordered ${errors.confirmPassword ? 'input-error' : ''}`}
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.confirmPassword}</span>
                </label>
              )}
            </div>

            {/* Submit Button */}
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Agree & Join
              </button>
            </div>

            {/* Terms */}
            <p className="text-xs text-center text-base-content/60">
              By clicking Agree & Join, you agree to the{' '}
              <Link to="/terms" className="link link-primary">User Agreement</Link>,{' '}
              <Link to="/privacy" className="link link-primary">Privacy Policy</Link>, and{' '}
              <Link to="/cookie" className="link link-primary">Cookie Policy</Link>.
            </p>
          </form>

          <div className="divider">OR</div>

          <div className="text-center">
            <p className="text-base-content/70">
              Already have an account?{' '}
              <Link to="/login" className="link link-primary font-semibold">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
