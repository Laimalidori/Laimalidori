'use client'

interface QuickActionsProps {
  actions: string[]
  onSelect: (action: string) => void
}

export function QuickActions({ actions, onSelect }: QuickActionsProps) {
  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {actions.map((action) => (
        <button
          key={action}
          onClick={() => onSelect(action)}
          className="px-3 py-1.5 body-sm text-text-tertiary bg-surface border border-[var(--border)] rounded-pill hover:border-[var(--border-strong)] hover:text-text-secondary transition-colors text-left"
        >
          {action}
        </button>
      ))}
    </div>
  )
}
