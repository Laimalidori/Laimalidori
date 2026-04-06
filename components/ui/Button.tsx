'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'secondary', size = 'md', loading, disabled, children, ...props }, ref) => {
    const base =
      'inline-flex items-center justify-center gap-2 font-sans font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 disabled:pointer-events-none disabled:opacity-40 cursor-pointer'

    const variants = {
      primary: 'bg-accent text-white hover:bg-accent-hover border border-accent hover:border-accent-hover',
      secondary: 'bg-transparent text-text-secondary border border-[var(--border)] hover:border-[var(--border-strong)] hover:text-text-primary',
      ghost: 'bg-transparent text-text-tertiary hover:text-text-secondary hover:bg-surface-subtle border border-transparent',
      danger: 'bg-danger-subtle text-danger border border-[var(--danger)] hover:bg-danger hover:text-white',
    }

    const sizes = {
      sm: 'h-7 px-3 text-[11px] rounded-sm',
      md: 'h-9 px-4 text-[12px] rounded',
      lg: 'h-10 px-5 text-[13px] rounded',
    }

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <span className="h-3 w-3 rounded-full border border-current border-t-transparent animate-spin" />
        ) : null}
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'

export { Button }
