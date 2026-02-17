import React from 'react'

function InterviewAssistant() {
  return (
    <div className="min-h-screen bg-base-200 py-10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-4xl font-bold text-center mb-6">Interview Assistant</h3>
          <p className="text-xl text-center opacity-70 mb-12">Prepare for interviews with AI-powered mock sessions and personalized feedback.</p>
          
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h4 className="text-2xl font-semibold mb-4">Preparation Tools</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center"><span className="badge badge-primary mr-2">✓</span>AI mock interviews</li>
                    <li className="flex items-center"><span className="badge badge-primary mr-2">✓</span>Common question database</li>
                    <li className="flex items-center"><span className="badge badge-primary mr-2">✓</span>Performance analytics</li>
                    <li className="flex items-center"><span className="badge badge-primary mr-2">✓</span>Personalized tips</li>
                  </ul>
                </div>
                <div className="text-center">
                  <button className="btn btn-primary btn-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Start Practice
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Features */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                <div className="text-4xl mb-4">📝</div>
                <h5 className="font-semibold">Question Bank</h5>
                <p className="text-sm opacity-70">Access 1000+ interview questions</p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                <div className="text-4xl mb-4">🎤</div>
                <h5 className="font-semibold">Voice Practice</h5>
                <p className="text-sm opacity-70">Practice your responses</p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                <div className="text-4xl mb-4">📊</div>
                <h5 className="font-semibold">Analytics</h5>
                <p className="text-sm opacity-70">Track your progress</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InterviewAssistant
