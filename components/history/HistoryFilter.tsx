'use client'

import { cn } from '@/lib/utils'
import type { HistoryFilter } from '@/types/history'

const FILTERS: Array<{ value: HistoryFilter; label: string }> = [
  { value: 'all', label: 'Todos' },
  { value: 'business_case', label: 'Business Cases' },
  { value: 'projeto', label: 'Projetos' },
  { value: 'apresentacao', label: 'Apresentações' },
  { value: 'pesquisa', label: 'Pesquisas' },
  { value: 'chat', label: 'Análises' },
]

interface HistoryFilterProps {
  value: HistoryFilter
  onChange: (filter: HistoryFilter) => void
}

export function HistoryFilterBar({ value, onChange }: HistoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {FILTERS.map((f) => (
        <button
          key={f.value}
          onClick={() => onChange(f.value)}
          className={cn(
            'px-3 py-1.5 body-sm rounded-pill border transition-colors',
            value === f.value
              ? 'bg-accent text-white border-accent'
              : 'text-text-tertiary border-[var(--border)] hover:border-[var(--border-strong)] hover:text-text-secondary'
          )}
        >
          {f.label}
        </button>
      ))}
    </div>
  )
}
