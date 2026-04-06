'use client'

import { useEffect, useRef } from 'react'
import { Message } from './Message'
import { TypingIndicator } from './TypingIndicator'

interface ChatMessage {
  id: string
  role: 'user' | 'assistant' | 'system' | 'data'
  content: string
}

interface MessageListProps {
  messages: ChatMessage[]
  isLoading: boolean
  conversationId?: string
  pillarId?: string
  pillarName?: string
  onSaveArtifact?: (content: string) => void
}

export function MessageList({
  messages,
  isLoading,
  conversationId,
  pillarId,
  pillarName,
  onSaveArtifact,
}: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  if (messages.length === 0) return null

  return (
    <div className="flex-1 overflow-y-auto py-6 px-4 md:px-0">
      {messages
        .filter((msg) => msg.role === 'user' || msg.role === 'assistant')
        .map((msg) => (
          <Message
            key={msg.id}
            role={msg.role as 'user' | 'assistant'}
            content={msg.content}
            conversationId={conversationId}
            pillarId={pillarId}
            pillarName={pillarName}
            onSaveArtifact={onSaveArtifact}
          />
        ))}
      {isLoading && (
        <div className="flex items-start gap-3 mb-6">
          <div className="flex-shrink-0 mt-0.5">
            <div className="h-5 w-5 rounded-full bg-accent/10 border border-[var(--accent-subtle)] flex items-center justify-center">
              <span className="text-[8px] font-semibold text-accent-text">N</span>
            </div>
          </div>
          <TypingIndicator />
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  )
}
