'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useChatStore } from '@/store/chat'
import { ChatInterface } from '@/components/chat/ChatInterface'
import { PillarGrid } from '@/components/pillars/PillarGrid'
import { ToolsGrid } from '@/components/pillars/ToolsGrid'
import { SectionLabel } from '@/components/ui/SectionLabel'

export default function DashboardPage() {
  const searchParams = useSearchParams()
  const { clearActive } = useChatStore()
  const toolPrompt = searchParams.get('tool')
  const [initialMessage] = useState(toolPrompt ?? undefined)

  useEffect(() => {
    clearActive()
  }, [clearActive])

  return (
    <div className="space-y-10">
      {/* Chat livre */}
      <section>
        <h1 className="display-md text-text-primary mb-1">Qual é o dilema de hoje?</h1>
        <p className="body-sm text-text-tertiary mb-5">
          Descreva o desafio. Nina aciona o especialista certo automaticamente.
        </p>
        <ChatInterface
          endpoint="/api/chat/free"
          initialMessage={initialMessage}
        />
      </section>

      {/* Pilares */}
      <section>
        <SectionLabel className="mb-4">Pilares de atuação</SectionLabel>
        <PillarGrid />
      </section>

      {/* Ferramentas */}
      <section>
        <SectionLabel className="mb-4">Ferramentas transversais</SectionLabel>
        <ToolsGrid />
      </section>
    </div>
  )
}
