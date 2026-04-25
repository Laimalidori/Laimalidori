'use client'

import { useState, useEffect } from 'react'
import { ChatInterface } from '@/components/chat/ChatInterface'
import { QuickActions } from '@/components/chat/QuickActions'
import { useChatStore } from '@/store/chat'

const QUICK_ACTIONS = [
  'Como diagnosticar o gap entre cultura declarada e praticada?',
  'Nosso eNPS caiu 15 pontos — o que fazer?',
  'Precisamos gerir uma mudança cultural importante',
]

export default function CulturaPage() {
  const [quickActionMessage, setQuickActionMessage] = useState<string | undefined>()
  const { clearActive, setActivePillar } = useChatStore()

  useEffect(() => {
    clearActive()
    setActivePillar('cultura')
  }, [clearActive, setActivePillar])

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-1">
        <span className="font-mono text-[10px] text-text-disabled tracking-widest uppercase">05</span>
        <h1 className="text-2xl font-semibold text-text-primary tracking-tight">Cultura & Experiência</h1>
        <p className="text-sm text-text-tertiary">
          Cultura organizacional, employee experience, engajamento e mudança
        </p>
      </div>

      {/* Architecture Diagram */}
      <div className="rounded-xl overflow-hidden border border-border-light" style={{ background: '#0C1024' }}>
        <iframe
          src="/cultura-diagram.html"
          className="w-full"
          style={{ height: '62vw', maxHeight: '680px', minHeight: '400px', border: 'none', display: 'block' }}
          title="Diagnóstico Cultural — Arquitetura de Fluxo"
        />
      </div>

      {/* Divider */}
      <div className="h-px bg-border-light" />

      {/* Quick actions */}
      {!quickActionMessage && (
        <div>
          <p className="text-sm text-text-tertiary mb-2">Perguntas frequentes:</p>
          <QuickActions actions={QUICK_ACTIONS} onSelect={setQuickActionMessage} />
        </div>
      )}

      {/* Chat */}
      <ChatInterface
        pillarId="cultura"
        pillarName="Cultura & Experiência"
        initialMessage={quickActionMessage}
      />
    </div>
  )
}
