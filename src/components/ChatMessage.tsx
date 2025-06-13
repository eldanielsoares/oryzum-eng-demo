
import React from 'react';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp?: string;
}

export function ChatMessage({ message, isUser, timestamp }: ChatMessageProps) {
  return (
    <div className={`flex gap-3 mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
          <Bot className="w-4 h-4 text-blue-600" />
        </div>
      )}
      
      <div className={`max-w-[70%] ${isUser ? 'order-1' : 'order-2'}`}>
        <div className={`p-3 rounded-lg ${
          isUser 
            ? 'bg-white border border-gray-200 text-gray-900' 
            : 'bg-gray-50 border border-blue-200 text-gray-800'
        }`}>
          <p className="text-sm leading-relaxed">{message}</p>
        </div>
        {timestamp && (
          <p className="text-xs text-muted-foreground mt-1 px-1">
            {timestamp}
          </p>
        )}
      </div>
      
      {isUser && (
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 order-2">
          <User className="w-4 h-4 text-primary-foreground" />
        </div>
      )}
    </div>
  );
}
