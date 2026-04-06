import { cn } from '@/lib/utils'

interface SectionLabelProps {
  children: React.ReactNode
  className?: string
  withLine?: boolean
}

export function SectionLabel({ children, className, withLine = true }: SectionLabelProps) {
  return (
    <div className={cn('flex items-center gap-4', className)}>
      <span className="label text-text-disabled whitespace-nowrap">{children}</span>
      {withLine && <div className="flex-1 h-px bg-[var(--border)]" />}
    </div>
  )
}
