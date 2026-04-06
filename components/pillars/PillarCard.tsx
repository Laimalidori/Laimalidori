'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { Pillar } from '@/types/agent'

interface PillarCardProps {
  pillar: Pillar
}

export function PillarCard({ pillar }: PillarCardProps) {
  return (
    <Link
      href={`/dashboard/pillar/${pillar.id}`}
      className={cn(
        'group block p-4 rounded border-l-2 border-[var(--border)] bg-surface',
        'border border-[var(--border)] border-l-2 border-l-[var(--border-strong)]',
        'hover:bg-surface-subtle hover:border-[var(--border-strong)] hover:border-l-accent',
        'transition-all duration-150'
      )}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="label text-text-disabled">{pillar.number}</span>
        <span className="text-text-disabled group-hover:translate-x-0.5 transition-transform">→</span>
      </div>
      <h3 className="display-sm text-text-primary mb-1 group-hover:text-accent transition-colors">
        {pillar.name}
      </h3>
      <p className="body-sm text-text-tertiary line-clamp-2 mb-3">
        {pillar.description}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {pillar.agents.slice(0, 3).map((agent) => (
          <span
            key={agent.id}
            className="px-2 py-0.5 body-sm text-text-disabled bg-surface-subtle border border-[var(--border)] rounded-pill"
          >
            {agent.name}
          </span>
        ))}
        {pillar.agents.length > 3 && (
          <span className="px-2 py-0.5 body-sm text-text-disabled">
            +{pillar.agents.length - 3}
          </span>
        )}
      </div>
    </Link>
  )
}
