import { cn } from '@/lib/utils'

interface SeparatorProps {
  label?: string
  className?: string
}

export function Separator({ label, className }: SeparatorProps) {
  if (label) {
    return (
      <div className={cn('flex items-center gap-3', className)}>
        <div className="flex-1 h-px bg-[var(--border)]" />
        <span className="label text-text-disabled">{label}</span>
        <div className="flex-1 h-px bg-[var(--border)]" />
      </div>
    )
  }

  return <div className={cn('h-px w-full bg-[var(--border)]', className)} />
}
