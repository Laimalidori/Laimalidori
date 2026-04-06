'use client'

import { useState, useEffect } from 'react'
import { notFound } from 'next/navigation'
import { getPillarById } from '@/lib/agents/pillars'
import { useChatStore } from '@/store/chat'
import { PillarHeader } from '@/components/pillars/PillarHeader'
import { ChatInterface } from '@/components/chat/ChatInterface'
import { QuickActions } from '@/components/chat/QuickActions'

interface PillarPageProps {
  params: Promise<{ id: string }>
}

export default function PillarPage({ params }: PillarPageProps) {
  const [pillarId, setPillarId] = useState<string>('')
  const [activeAgentId, setActiveAgentId] = useState<string>('')
  const [quickActionMessage, setQuickActionMessage] = useState<string | undefined>()
  const { clearActive, setActivePillar } = useChatStore()

  useEffect(() => {
    params.then(({ id }) => {
      setPillarId(id)
      clearActive()
      setActivePillar(id)
    })
  }, [params, clearActive, setActivePillar])

  if (!pillarId) return null

  const pillar = getPillarById(pillarId)
  if (!pillar) notFound()

  function handleQuickAction(action: string) {
    setQuickActionMessage(action)
  }

  return (
    <div className="space-y-6">
      <PillarHeader
        pillar={pillar}
        activeAgentId={activeAgentId}
        onAgentChange={setActiveAgentId}
      />

      {!quickActionMessage && pillar.quickActions.length > 0 && (
        <div>
          <p className="body-sm text-text-tertiary mb-2">Perguntas frequentes:</p>
          <QuickActions
            actions={pillar.quickActions}
            onSelect={handleQuickAction}
          />
        </div>
      )}

      <ChatInterface
        pillarId={pillar.id}
        pillarName={pillar.name}
        agentId={activeAgentId || undefined}
        initialMessage={quickActionMessage}
      />
    </div>
  )
}
