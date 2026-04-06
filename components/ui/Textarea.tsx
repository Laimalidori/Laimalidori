'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className="label text-text-tertiary">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          className={cn(
            'w-full rounded-sm border border-[var(--border-strong)] bg-surface px-3 py-2.5 text-[13px] text-text-primary placeholder:text-text-disabled transition-colors resize-none',
            'focus:outline-none focus:border-accent',
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
Textarea.displayName = 'Textarea'

export { Textarea }
