'use client'

import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'
import type { Conversation } from '@/types/chat'

interface HistoryItemProps {
  conversation: Conversation
}

export function HistoryItem({ conversation }: HistoryItemProps) {
  return (
    <Link
      href={`/dashboard/pillar/${conversation.pillar_id ?? 'free'}?conv=${conversation.id}`}
      className="flex items-center gap-4 px-4 py-3 bg-surface border border-[var(--border)] rounded hover:border-[var(--border-strong)] hover:bg-surface-subtle transition-all group"
    >
      <div className="w-14 body-sm text-text-disabled text-right flex-shrink-0">
        {new Date(conversation.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
      </div>
      <div className="flex-1 min-w-0">
        <p className="body-md text-text-primary truncate">
          {conversation.titulo ?? 'Conversa sem título'}
        </p>
        <div className="flex items-center gap-2 mt-0.5">
          {conversation.pillar_name && (
            <Badge variant="default">{conversation.pillar_name}</Badge>
          )}
          {conversation.tipo && conversation.tipo !== 'chat' && (
            <Badge variant="accent">{conversation.tipo}</Badge>
          )}
        </div>
      </div>
      <span className="text-text-disabled group-hover:translate-x-0.5 transition-transform flex-shrink-0">→</span>
    </Link>
  )
}
