
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Send, Brain, Download, RefreshCw } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { ConversationHistory } from './ConversationHistory';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
}

const mockResponses = {
  "how many vehicles are operational today": "Currently, 12 vehicles are operational, 4 in alert status, and 1 disconnected for 36 hours.",
  "what are the main active issues": "We currently have 2 vehicles with overheating and 1 with electrical failure in the rotation sensor.",
  "how is preventive maintenance planning": "5 vehicles have preventive maintenance scheduled for this week. No critical overdue appointments.",
  "estimated damage if we don't resolve open failures": "The cumulative predictive cost is $4,500, considering 18 potential hours of unplanned downtime.",
  "main operational risk": "There's a risk of shutdown in 3 vehicles due to persistent overheating. Potential shutdown cost: $3,200.",
  "overdue preventive maintenance": "Two vehicles have preventive maintenance overdue by 5 days."
};

export function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your AI Copilot. I can help you with fleet insights, operational status, alerts, and decision support. How can I assist you today?',
      isUser: false,
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    for (const [key, response] of Object.entries(mockResponses)) {
      if (lowerMessage.includes(key.split(' ')[0]) || lowerMessage.includes(key)) {
        return response;
      }
    }
    
    return "I understand your question. Based on current fleet data, I can provide detailed analysis. Could you be more specific about what operational aspect you'd like to know about?";
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(inputValue),
        isUser: false,
        timestamp: new Date().toLocaleTimeString()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Brain className="w-6 h-6 text-blue-600" />
            AI Copilot
          </h2>
          <p className="text-muted-foreground">Operational fleet assistant with real-time insights</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-green-600 border-green-200">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            Connected to Fleet Data
          </Badge>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Chat
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
        {/* Conversation History Sidebar */}
        <div className="lg:col-span-1">
          <ConversationHistory />
        </div>

        {/* Main Chat Area */}
        <div className="lg:col-span-3 flex flex-col">
          <Card className="flex-1 flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Active Conversation</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto pr-4 mb-4 space-y-1">
                {messages.map((message) => (
                  <ChatMessage
                    key={message.id}
                    message={message.text}
                    isUser={message.isUser}
                    timestamp={message.timestamp}
                  />
                ))}
                
                {isTyping && (
                  <div className="flex gap-3 mb-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />
                    </div>
                    <div className="bg-gray-50 border border-blue-200 p-3 rounded-lg">
                      <p className="text-sm text-gray-600">AI Copilot is analyzing fleet data...</p>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t pt-4">
                <div className="flex gap-2">
                  <Textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about fleet status, maintenance, alerts, or operational insights..."
                    className="min-h-[50px] resize-none"
                    disabled={isTyping}
                  />
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    className="px-3"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="mt-2 flex flex-wrap gap-2">
                  <button 
                    className="text-xs text-blue-600 hover:text-blue-800 border border-blue-200 rounded px-2 py-1"
                    onClick={() => setInputValue("How many vehicles are operational today?")}
                  >
                    Fleet Status
                  </button>
                  <button 
                    className="text-xs text-blue-600 hover:text-blue-800 border border-blue-200 rounded px-2 py-1"
                    onClick={() => setInputValue("What are the main active issues?")}
                  >
                    Active Issues
                  </button>
                  <button 
                    className="text-xs text-blue-600 hover:text-blue-800 border border-blue-200 rounded px-2 py-1"
                    onClick={() => setInputValue("How is preventive maintenance planning?")}
                  >
                    Maintenance Planning
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
