import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'accent' | 'gold' | 'success' | 'warning' | 'danger'
  className?: string
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  const variants = {
    default: 'bg-surface-subtle text-text-tertiary border-[var(--border)]',
    accent: 'bg-accent-subtle text-accent-text border-[var(--accent-subtle)]',
    gold: 'bg-gold-subtle text-gold border-[var(--gold-subtle)]',
    success: 'bg-success-subtle text-success border-[var(--success-subtle)]',
    warning: 'bg-warning-subtle text-warning border-[var(--warning-subtle)]',
    danger: 'bg-danger-subtle text-danger border-[var(--danger-subtle)]',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-pill border px-2 py-0.5 label',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
