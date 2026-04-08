'use client'

import { useState, useEffect } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPillarById } from '@/lib/agents/pillars'
import { useChatStore } from '@/store/chat'
import { PillarHeader } from '@/components/pillars/PillarHeader'
import { ChatInterface } from '@/components/chat/ChatInterface'
import { QuickActions } from '@/components/chat/QuickActions'

// Módulos estruturados por pilar
const MODULOS_POR_PILAR: Record<string, Array<{ href: string; numero: string; nome: string; descricao: string }>> = {
  estrategia: [
    {
      href: '/dashboard/modulo/workforce-planning',
      numero: '01',
      nome: 'Workforce Planning',
      descricao: 'Diagnóstico, projeção, gaps e plano de ação em 6 etapas estruturadas.',
    },
  ],
}

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

  const modulos = MODULOS_POR_PILAR[pillarId] ?? []

  return (
    <div className="space-y-6">
      <PillarHeader
        pillar={pillar}
        activeAgentId={activeAgentId}
        onAgentChange={setActiveAgentId}
      />

      {/* Módulos estruturados deste pilar */}
      {modulos.length > 0 && (
        <div>
          <p className="label-sm text-text-tertiary mb-3">Módulos estruturados</p>
          <div className="flex flex-col gap-2">
            {modulos.map((m) => (
              <Link
                key={m.href}
                href={m.href}
                className="flex items-center gap-4 border border-border-light rounded-lg px-4 py-3.5 bg-bg-surface hover:border-border-medium hover:bg-bg-subtle transition-all group"
              >
                <span className="mono-sm text-text-disabled shrink-0">{m.numero}</span>
                <div className="flex-1 min-w-0">
                  <p className="body-sm font-medium text-text-primary group-hover:text-accent transition-colors">
                    {m.nome}
                  </p>
                  <p className="text-xs text-text-tertiary">{m.descricao}</p>
                </div>
                <span className="text-text-disabled group-hover:translate-x-0.5 transition-transform shrink-0">→</span>
              </Link>
            ))}
          </div>
        </div>
      )}

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
