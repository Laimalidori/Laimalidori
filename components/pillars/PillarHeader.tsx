'use client'

import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import type { Pillar } from '@/types/agent'

interface PillarHeaderProps {
  pillar: Pillar
  activeAgentId?: string
  onAgentChange: (agentId: string) => void
}

export function PillarHeader({ pillar, activeAgentId, onAgentChange }: PillarHeaderProps) {
  return (
    <div className="mb-6">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1 body-sm text-text-tertiary hover:text-text-secondary transition-colors mb-4"
      >
        <ChevronLeft size={14} />
        Início
      </Link>
      <div className="flex items-baseline gap-3 mb-2">
        <span className="label text-text-disabled">{pillar.number}</span>
        <h1 className="display-md text-text-primary">{pillar.name}</h1>
      </div>
      <p className="body-md text-text-tertiary mb-4">{pillar.description}</p>

      {pillar.agents.length > 1 && (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onAgentChange('')}
            className={`px-3 py-1 body-sm rounded-pill border transition-colors ${
              !activeAgentId
                ? 'bg-accent text-white border-accent'
                : 'text-text-tertiary border-[var(--border)] hover:border-[var(--border-strong)]'
            }`}
          >
            Todos
          </button>
          {pillar.agents.map((agent) => (
            <button
              key={agent.id}
              onClick={() => onAgentChange(agent.id)}
              className={`px-3 py-1 body-sm rounded-pill border transition-colors ${
                activeAgentId === agent.id
                  ? 'bg-accent text-white border-accent'
                  : 'text-text-tertiary border-[var(--border)] hover:border-[var(--border-strong)]'
              }`}
            >
              {agent.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
