'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useChatStore } from '@/store/chat'
import { ChatInterface } from '@/components/chat/ChatInterface'
import { PillarGrid } from '@/components/pillars/PillarGrid'
import { ToolsGrid } from '@/components/pillars/ToolsGrid'

function DashboardContent() {
  const searchParams = useSearchParams()
  const { clearActive } = useChatStore()
  const toolPrompt = searchParams.get('tool')
  const [initialMessage] = useState(toolPrompt ?? undefined)

  useEffect(() => {
    clearActive()
  }, [clearActive])

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section>
        <h1 className="display-xl text-text-primary mb-1">
          Qual é o dilema de hoje?
        </h1>
        <p className="body-md text-text-tertiary mb-6 max-w-xl">
          Descreva o desafio. Nina aciona o especialista certo automaticamente.
        </p>
        <ChatInterface
          endpoint="/api/chat/free"
          initialMessage={initialMessage}
        />
      </section>

      {/* Pilares */}
      <section>
        <div className="flex items-center gap-4 mb-5">
          <p className="label-sm text-text-disabled shrink-0">Pilares de atuação</p>
          <div className="flex-1 h-px bg-border-light" />
        </div>
        <PillarGrid />
      </section>

      {/* Ferramentas */}
      <section>
        <div className="flex items-center gap-4 mb-4">
          <p className="label-sm text-text-disabled shrink-0">Ferramentas transversais</p>
          <div className="flex-1 h-px bg-border-light" />
        </div>
        <ToolsGrid />
      </section>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <Suspense>
      <DashboardContent />
    </Suspense>
  )
}
