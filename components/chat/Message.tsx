'use client'

import { useState } from 'react'
import { detectArtifact } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { BookmarkPlus } from 'lucide-react'

interface MessageProps {
  role: 'user' | 'assistant'
  content: string
  conversationId?: string
  pillarId?: string
  pillarName?: string
  onSaveArtifact?: (content: string) => void
}

function renderContent(content: string): string {
  return content
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/^---$/gm, '<hr />')
    .replace(/^[-*] (.+)$/gm, '<li>$1</li>')
    .replace(/\n\n/g, '\n')
}

export function Message({ role, content, onSaveArtifact }: MessageProps) {
  const [saved, setSaved] = useState(false)
  const isArtifact = role === 'assistant' && detectArtifact(content)

  if (role === 'user') {
    return (
      <div className="flex justify-end mb-4">
        <div className="max-w-[70%] rounded-lg rounded-tr-sm bg-accent text-white px-4 py-2.5 body-md leading-relaxed">
          {content}
        </div>
      </div>
    )
  }

  return (
    <div className="mb-6 group">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          <div className="h-5 w-5 rounded-full bg-[var(--accent-subtle)] border border-[var(--accent-subtle)] flex items-center justify-center">
            <span className="text-[8px] font-semibold text-accent-text">N</span>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div
            className="prose-chat body-md text-text-secondary"
            dangerouslySetInnerHTML={{ __html: renderContent(content) }}
          />
          {isArtifact && !saved && (
            <div className="mt-3 pt-3 border-t border-[var(--border)]">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => { onSaveArtifact?.(content); setSaved(true) }}
                className="gap-1.5"
              >
                <BookmarkPlus size={13} />
                Salvar como artefato
              </Button>
            </div>
          )}
          {saved && (
            <p className="mt-2 body-sm text-success">Artefato salvo.</p>
          )}
        </div>
      </div>
    </div>
  )
}
