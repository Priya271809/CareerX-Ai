import React, { useState } from 'react'

function ResumeOptimizer() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [uploadStatus, setUploadStatus] = useState('')

  const handleFileSelect = (event) => {
    const file = event.target.files[0]
    if (file) {
      // Check if file is PDF or DOC/DOCX
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
      if (allowedTypes.includes(file.type)) {
        setSelectedFile(file)
        setUploadStatus('')
      } else {
        setUploadStatus('Please select a PDF or Word document (.doc, .docx)')
        setSelectedFile(null)
      }
    }
  }

  const handleOptimize = () => {
    if (!selectedFile) {
      setUploadStatus('Please select a resume file first')
      return
    }

    setIsProcessing(true)
    setUploadStatus('Processing your resume...')

    // Simulate processing delay
    setTimeout(() => {
      setIsProcessing(false)
      setUploadStatus('Resume optimized successfully! Download your enhanced resume below.')
    }, 3000)
  }

  const handleDownload = () => {
    // Simulate download
    alert('Download functionality would be implemented here')
  }

  return (
    <div className="min-h-screen bg-base-200 py-10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-4xl font-bold text-center mb-6">Resume Optimizer</h3>
          <p className="text-xl text-center opacity-70 mb-12">Enhance your resume with AI-powered suggestions to stand out to employers.</p>

          <div className="card bg-base-100 shadow-xl mb-8">
            <div className="card-body">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h4 className="text-2xl font-semibold mb-4">Key Features</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center"><span className="badge badge-primary mr-2">✓</span>AI-powered keyword optimization</li>
                    <li className="flex items-center"><span className="badge badge-primary mr-2">✓</span>ATS-friendly formatting</li>
                    <li className="flex items-center"><span className="badge badge-primary mr-2">✓</span>Industry-specific suggestions</li>
                    <li className="flex items-center"><span className="badge badge-primary mr-2">✓</span>Real-time feedback</li>
                  </ul>
                </div>
                <div className="text-center">
                  <div className="mb-4">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="resume-upload"
                    />
                    <label
                      htmlFor="resume-upload"
                      className="btn btn-primary"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                      Choose Resume File
                    </label>
                  </div>
                  {selectedFile && (
                    <div className="alert alert-success mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{selectedFile.name}</span>
                    </div>
                  )}
                  <button
                    onClick={handleOptimize}
                    disabled={isProcessing}
                    className="btn btn-secondary btn-lg"
                  >
                    {isProcessing ? (
                      <>
                        <span className="loading loading-spinner"></span>
                        Processing...
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Optimize My Resume
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {uploadStatus && (
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body text-center">
                {uploadStatus.includes('successfully') ? (
                  <div className="alert alert-success">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{uploadStatus}</span>
                  </div>
                ) : uploadStatus.includes('Please select') ? (
                  <div className="alert alert-warning">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span>{uploadStatus}</span>
                  </div>
                ) : (
                  <div className="alert alert-info">
                    <span className="loading loading-spinner"></span>
                    <span>{uploadStatus}</span>
                  </div>
                )}
                
                {uploadStatus.includes('successfully') && (
                  <button
                    onClick={handleDownload}
                    className="btn btn-primary mt-4"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download Optimized Resume
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ResumeOptimizer
