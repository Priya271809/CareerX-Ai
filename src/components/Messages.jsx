import React, { useState } from 'react'

function Messages() {
  const [activeTab, setActiveTab] = useState('all')

  const tabs = [
    { id: 'all', label: 'All Messages', icon: '📨' },
    { id: 'unread', label: 'Unread', icon: '📬' },
    { id: 'job', label: 'Job Messages', icon: '💼' },
    { id: 'inmail', label: 'InMail', icon: '✉️' }
  ]

  return (
    <div className="min-h-screen bg-base-200 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Messages</h1>

        <div className="flex gap-6">
          {/* Left Sidebar */}
          <div className="w-64 bg-base-100 rounded-box shadow p-4">
            <div className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`btn btn-ghost w-full justify-start ${
                    activeTab === tab.id ? 'btn-active' : ''
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 bg-base-100 rounded-box shadow p-6">
            <div className="text-center text-base-content/50">
              <div className="text-8xl mb-4">💬</div>
              <h2 className="text-xl font-semibold mb-2">No messages yet</h2>
              <p>When you receive messages, they'll appear here.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Messages
