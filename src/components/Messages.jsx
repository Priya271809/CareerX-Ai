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
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Messages</h1>

        <div className="flex gap-8">
          {/* Left Sidebar */}
          <div className="w-64 bg-white rounded-lg shadow-md p-4">
            <div className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 p-3 text-left rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-green-100 text-green-800'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 bg-white rounded-lg shadow-md p-6">
            <div className="text-center text-gray-500">
              <div className="text-6xl mb-4">💬</div>
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
