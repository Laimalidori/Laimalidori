'use client'

import { useRef, useEffect, KeyboardEvent } from 'react'
import { cn } from '@/lib/utils'
import { ArrowUp } from 'lucide-react'

interface ChatInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  disabled?: boolean
  placeholder?: string
}

export function ChatInput({ value, onChange, onSubmit, disabled, placeholder }: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, 200)}px`
  }, [value])

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (value.trim() && !disabled) {
        onSubmit()
      }
    }
  }

  return (
    <div className="relative flex items-end gap-2 p-3 bg-surface border border-[var(--border)] rounded-lg focus-within:border-[var(--border-strong)] transition-colors">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder ?? 'Qual é o dilema de hoje?'}
        disabled={disabled}
        rows={1}
        enterKeyHint="send"
        className={cn(
          'flex-1 bg-transparent resize-none border-0 outline-none body-md text-text-primary placeholder:text-text-disabled',
          'min-h-[24px] max-h-[200px] py-0'
        )}
      />
      <button
        onClick={() => value.trim() && !disabled && onSubmit()}
        disabled={!value.trim() || disabled}
        className={cn(
          'flex-shrink-0 h-7 w-7 rounded flex items-center justify-center transition-colors',
          value.trim() && !disabled
            ? 'bg-accent text-white hover:bg-accent-hover'
            : 'bg-surface-subtle text-text-disabled cursor-not-allowed'
        )}
        aria-label="Enviar mensagem"
      >
        <ArrowUp size={14} />
      </button>
    </div>
  )
}
