import { ChatBubbleBottomCenterIcon, PlusIcon } from '@heroicons/react/24/outline'
import React from 'react'

const Sidebar = () => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <ChatBubbleBottomCenterIcon className="w-6 h-6 text-indigo-600" />
          <h1 className="text-lg font-semibold text-gray-900">Messages</h1>
        </div>
      </div>
      
      <div className="p-3">
        <button className="w-full bg-indigo-600 text-white rounded-lg px-4 py-2 flex items-center justify-center space-x-2 hover:bg-indigo-700 transition-colors duration-200">
          <PlusIcon className="w-4 h-4" />
          <span>New Chat</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {["Design Team", "Project Alpha", "General"].map((chat, index) => (
          <div
            key={index}
            className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                <span className="text-indigo-600 font-medium">
                  {chat[0]}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-900">{chat}</h3>
                <p className="text-xs text-gray-500">Latest message...</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
