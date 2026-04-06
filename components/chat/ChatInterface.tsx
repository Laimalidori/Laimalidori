'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { useChat } from '@ai-sdk/react'
import { TextStreamChatTransport } from 'ai'
import { createClient } from '@/lib/supabase/client'
import { useChatStore } from '@/store/chat'
import { MessageList } from './MessageList'
import { ChatInput } from './ChatInput'

interface ChatInterfaceProps {
  pillarId?: string
  pillarName?: string
  agentId?: string
  initialMessage?: string
  endpoint?: string
}

export function ChatInterface({
  pillarId,
  pillarName,
  agentId,
  initialMessage,
  endpoint = '/api/chat',
}: ChatInterfaceProps) {
  const { activeConversationId, setActiveConversation } = useChatStore()
  const [input, setInput] = useState('')

  const transport = useMemo(
    () =>
      new TextStreamChatTransport({
        api: endpoint,
        body: {
          pillarId,
          agentId,
          conversationId: activeConversationId,
        },
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [endpoint, pillarId, agentId]
  )

  const { messages, sendMessage, status } = useChat({ transport })
  const isLoading = status === 'submitted' || status === 'streaming'

  // Send initial message if provided
  useEffect(() => {
    if (initialMessage && messages.length === 0) {
      sendMessage({ text: initialMessage })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSend = useCallback(async () => {
    if (!input.trim()) return

    const userMessage = input
    setInput('')

    if (!activeConversationId) {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data: conv } = await supabase
          .from('conversations')
          .insert({
            user_id: user.id,
            pillar_id: pillarId ?? null,
            pillar_name: pillarName ?? null,
            agent_id: agentId ?? null,
            tipo: 'chat',
            titulo: userMessage.slice(0, 80),
          })
          .select()
          .single()

        if (conv) {
          setActiveConversation(conv)
          await supabase.from('messages').insert({
            conversation_id: conv.id,
            role: 'user',
            content: userMessage,
          })
          generateTitle(conv.id, userMessage)
        }
      }
    } else {
      const supabase = createClient()
      await supabase.from('messages').insert({
        conversation_id: activeConversationId,
        role: 'user',
        content: userMessage,
      })
    }

    sendMessage({ text: userMessage })
  }, [input, activeConversationId, pillarId, pillarName, agentId, setActiveConversation, sendMessage])

  async function generateTitle(conversationId: string, firstMessage: string) {
    try {
      await fetch('/api/chat/title', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: firstMessage, conversationId }),
      })
    } catch {
      // Non-critical
    }
  }

  async function handleSaveArtifact(content: string) {
    if (!activeConversationId) return
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    await supabase.from('artifacts').insert({
      conversation_id: activeConversationId,
      user_id: user.id,
      tipo: 'business_case',
      titulo: 'Artefato gerado',
      conteudo: content,
      pillar_id: pillarId ?? null,
      pillar_name: pillarName ?? null,
    })
  }

  // Extract text content from UIMessage parts
  const simplifiedMessages = messages
    .filter((m) => m.role === 'user' || m.role === 'assistant')
    .map((m) => ({
      id: m.id,
      role: m.role as 'user' | 'assistant',
      content: m.parts
        .filter((p): p is { type: 'text'; text: string } => p.type === 'text')
        .map((p) => p.text)
        .join(''),
    }))

  return (
    <div className="flex flex-col h-full">
      <MessageList
        messages={simplifiedMessages}
        isLoading={isLoading}
        conversationId={activeConversationId ?? undefined}
        pillarId={pillarId}
        pillarName={pillarName}
        onSaveArtifact={handleSaveArtifact}
      />
      <div className={messages.length > 0 ? 'pt-4' : ''}>
        <ChatInput
          value={input}
          onChange={setInput}
          onSubmit={handleSend}
          disabled={isLoading}
        />
      </div>
    </div>
  )
}
