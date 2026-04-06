'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className="label text-text-tertiary">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            'h-9 w-full rounded-sm border border-[var(--border-strong)] bg-surface px-3 text-[13px] text-text-primary placeholder:text-text-disabled transition-colors',
            'focus:outline-none focus:border-accent focus:ring-0',
            'focus-visible:shadow-[0_0_0_3px_rgba(15,39,68,0.12)]',
            error && 'border-danger',
            className
          )}
          {...props}
        />
        {error && (
          <p className="body-sm text-danger">{error}</p>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
