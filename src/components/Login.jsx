import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.email) newErrors.email = 'Email is required'
    if (!formData.password) newErrors.password = 'Password is required'
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validateForm()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    const success = login(formData.email, formData.password)
    if (success) {
      navigate('/')
    } else {
      setErrors({ general: 'Invalid email or password' })
    }
  }

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
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
            <h2 className="card-title text-3xl font-bold justify-center">Welcome Back</h2>
            <p className="text-base-content/70 mt-2">Sign in to continue your career journey</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
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
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
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

            {/* General Error */}
            {errors.general && (
              <div className="alert alert-error">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{errors.general}</span>
              </div>
            )}

            {/* Submit Button */}
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Sign In
              </button>
            </div>

            {/* Forgot Password */}
            <div className="text-center mt-4">
              <Link to="/forgot-password" className="link link-primary">
                Forgot password?
              </Link>
            </div>
          </form>

          <div className="divider">OR</div>

          <div className="text-center">
            <p className="text-base-content/70">
              Don't have an account?{' '}
              <Link to="/signup" className="link link-primary font-semibold">
                Sign up now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
