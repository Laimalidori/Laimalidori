'use client'

import Link from 'next/link'
import type { Pillar } from '@/types/agent'

interface PillarCardProps {
  pillar: Pillar
}

export function PillarCard({ pillar }: PillarCardProps) {
  return (
    <Link
      href={`/dashboard/pillar/${pillar.id}`}
      className="group flex items-start gap-4 p-5 bg-bg-surface border border-border-light rounded-xl hover:border-border-medium hover:shadow-card transition-all duration-150"
    >
      {/* Número */}
      <span className="mono-sm text-text-disabled shrink-0 mt-0.5 w-6">{pillar.number}</span>

      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-text-primary group-hover:text-accent transition-colors mb-1">
          {pillar.name}
        </h3>
        <p className="text-xs text-text-tertiary line-clamp-2 leading-relaxed mb-3">
          {pillar.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {pillar.agents.slice(0, 3).map((agent) => (
            <span
              key={agent.id}
              className="px-2 py-0.5 text-[10px] text-text-disabled bg-bg-subtle border border-border-light rounded-full"
            >
              {agent.name}
            </span>
          ))}
          {pillar.agents.length > 3 && (
            <span className="text-[10px] text-text-disabled">+{pillar.agents.length - 3}</span>
          )}
        </div>
      </div>

      <span className="text-text-disabled group-hover:text-accent group-hover:translate-x-0.5 transition-all shrink-0 mt-0.5 text-sm">
        →
      </span>
    </Link>
  )
}
