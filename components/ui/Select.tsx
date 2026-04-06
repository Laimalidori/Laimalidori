'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: Array<{ value: string; label: string }>
  placeholder?: string
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, id, options, placeholder, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className="label text-text-tertiary">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={id}
          className={cn(
            'h-9 w-full rounded-sm border border-[var(--border-strong)] bg-surface px-3 text-[13px] text-text-primary transition-colors appearance-none',
            'focus:outline-none focus:border-accent',
            'focus-visible:shadow-[0_0_0_3px_rgba(15,39,68,0.12)]',
            error && 'border-danger',
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="body-sm text-danger">{error}</p>
        )}
      </div>
    )
  }
)
Select.displayName = 'Select'

export { Select }
