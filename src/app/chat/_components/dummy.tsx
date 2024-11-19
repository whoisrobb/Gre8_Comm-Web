import React from 'react'
import { MessageSquare, Users, Search, Settings, Send, Plus, Image, File } from "lucide-react";
import MessageInput from '@/components/elements/message-input/message-input';

const Dummy = () => {
  const messages = [
        {
            id: 1,
            user: "Sarah Parker",
            content: "Hey team! Just finished the design review.",
            timestamp: "10:30 AM"
        },
        {
            id: 2,
            user: "John Smith",
            content: "Great work! The client loved the new interface.",
            timestamp: "10:32 AM"
        },
        {
            id: 3,
            user: "You",
            content: "Thanks everyone for your hard work on this project!",
            timestamp: "10:35 AM",
            isOwn: true
        },
        {
            id: 4,
            user: "Sarah Parker",
            content: "Hey team! Just finished the design review.",
            timestamp: "10:30 AM"
        },
        {
            id: 5,
            user: "John Smith",
            content: "Great work! The client loved the new interface.",
            timestamp: "10:32 AM"
        },
        {
            id: 6,
            user: "You",
            content: "Thanks everyone for your hard work on this project!",
            timestamp: "10:35 AM",
            isOwn: true
        },
    ];

  return (<div className="flex-1 flex flex-col">
    {/* Header */}
    <div className="h-16 border-b border-gray-200 bg-white px-6 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <h2 className="text-lg font-semibold text-gray-900">Design Team</h2>
        <div className="flex items-center space-x-1">
          <Users className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-500">12</span>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
          <Search className="w-5 h-5 text-gray-500" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
          <Settings className="w-5 h-5 text-gray-500" />
        </button>
      </div>
    </div>

    {/* Messages */}
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      {messages.map((message, index) => (
        <div
          key={message.id}
          className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'} animate-message-appear`}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className={`max-w-lg ${message.isOwn ? 'bg-indigo-600 text-white' : 'bg-white border border-gray-200'} rounded-lg px-4 py-3 shadow-sm`}>
            <div className="flex items-center space-x-2 mb-1">
              <span className={`text-sm font-medium ${message.isOwn ? 'text-indigo-100' : 'text-gray-900'}`}>
                {message.user}
              </span>
              <span className={`text-xs ${message.isOwn ? 'text-indigo-200' : 'text-gray-500'}`}>
                {message.timestamp}
              </span>
            </div>
            <p className={`text-sm ${message.isOwn ? 'text-white' : 'text-gray-800'}`}>
              {message.content}
            </p>
          </div>
        </div>
      ))}
    </div>

    {/* Input Area */}
    <div className="border-t border-gray-200 bg-white p-4">
        <div className="flex items-center space-x-4">
            {/* <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
            <Plus className="w-5 h-5 text-gray-500" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
            <Image className="w-5 h-5 text-gray-500" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
            <File className="w-5 h-5 text-gray-500" />
            </button>
            <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <button className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200">
            <Send className="w-5 h-5" />
            </button> */}
            <MessageInput />
        </div>
    </div>
  </div>
  )
}

export default Dummy
