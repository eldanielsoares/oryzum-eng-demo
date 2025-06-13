
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, MessageSquare } from 'lucide-react';

interface Conversation {
  id: string;
  title: string;
  timestamp: string;
  preview: string;
}

const mockConversations: Conversation[] = [
  {
    id: '1',
    title: 'Fleet Status Check',
    timestamp: '2 hours ago',
    preview: 'How many vehicles are operational today?'
  },
  {
    id: '2',
    title: 'Maintenance Review',
    timestamp: '1 day ago',
    preview: 'Which vehicles need preventive maintenance?'
  },
  {
    id: '3',
    title: 'Alert Analysis',
    timestamp: '2 days ago',
    preview: 'What are the current critical alerts?'
  },
  {
    id: '4',
    title: 'Cost Analysis',
    timestamp: '3 days ago',
    preview: 'Estimated costs for pending failures?'
  }
];

export function ConversationHistory() {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          Recent Conversations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {mockConversations.map((conversation) => (
          <div 
            key={conversation.id}
            className="p-3 rounded-lg border hover:bg-accent cursor-pointer transition-colors"
          >
            <div className="flex items-center justify-between mb-1">
              <h4 className="font-medium text-sm">{conversation.title}</h4>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                {conversation.timestamp}
              </div>
            </div>
            <p className="text-xs text-muted-foreground line-clamp-2">
              {conversation.preview}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
