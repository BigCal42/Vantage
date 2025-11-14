'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { MessageSquare, Send, Sparkles, Brain, User } from 'lucide-react'
import { useState } from 'react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
  suggestions?: string[]
}

const initialMessages: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content: 'Hi! I\'m your Vantage AI assistant. Ask me anything about your project, or try one of the suggestions below.',
    timestamp: '2:34 PM',
    suggestions: [
      'What are the biggest risks right now?',
      'Show me budget trajectory',
      'When is our next milestone?'
    ]
  }
]

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: 'Based on your current project data, I see 2 medium-severity risks that need attention within the next week. Your vendor delivery velocity has decreased 15% over the past phase, and your Q3 resource allocation shows a gap of 2 developers. Would you like me to generate mitigation plans for these?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestions: [
        'Yes, create mitigation plans',
        'Show vendor performance details',
        'Analyze resource gaps'
      ]
    }

    setMessages([...messages, userMessage, aiResponse])
    setInput('')
  }

  return (
    <Card className="flex flex-col h-[600px]">
      <CardHeader className="border-b border-border/50">
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="size-5 text-primary" />
          Ask Vantage
          <Badge variant="outline" className="ml-auto bg-primary/10 text-primary border-primary/20">
            AI Chat
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`size-8 rounded-lg flex items-center justify-center shrink-0 ${
              message.role === 'user' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted text-foreground'
            }`}>
              {message.role === 'user' ? (
                <User className="size-4" />
              ) : (
                <Brain className="size-4" />
              )}
            </div>
            
            <div className={`flex-1 space-y-2 ${message.role === 'user' ? 'items-end' : ''}`}>
              <div
                className={`inline-block p-4 rounded-2xl ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground ml-auto'
                    : 'bg-muted'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
              </div>
              
              <div className="text-xs text-muted-foreground">
                {message.timestamp}
              </div>

              {message.suggestions && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {message.suggestions.map((suggestion, i) => (
                    <Button
                      key={i}
                      variant="outline"
                      size="sm"
                      className="text-xs gap-1 hover:bg-primary/10"
                      onClick={() => setInput(suggestion)}
                    >
                      <Sparkles className="size-3" />
                      {suggestion}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </CardContent>

      <div className="border-t border-border/50 p-4">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about risks, timeline, budget..."
            className="flex-1"
          />
          <Button onClick={handleSend} className="gap-2">
            <Send className="size-4" />
            Send
          </Button>
        </div>
      </div>
    </Card>
  )
}
