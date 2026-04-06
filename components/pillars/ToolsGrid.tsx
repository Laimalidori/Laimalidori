'use client'

import { useRouter } from 'next/navigation'
import { TOOLS } from '@/lib/agents/pillars'
import { useChatStore } from '@/store/chat'

export function ToolsGrid() {
  const router = useRouter()
  const { clearActive } = useChatStore()

  function handleToolSelect(prompt: string) {
    clearActive()
    // Encode the prompt as a search param and navigate to home
    const params = new URLSearchParams({ tool: prompt })
    router.push(`/dashboard?${params.toString()}`)
  }

  return (
    <div className="flex flex-wrap gap-2">
      {TOOLS.map((tool) => (
        <button
          key={tool.id}
          onClick={() => handleToolSelect(tool.prompt)}
          className="px-4 py-2 bg-surface border border-[var(--border)] rounded hover:border-[var(--border-strong)] hover:bg-surface-subtle transition-colors text-left"
        >
          <span className="body-sm text-text-secondary font-medium block">{tool.name}</span>
          <span className="body-sm text-text-tertiary">{tool.description}</span>
        </button>
      ))}
    </div>
  )
}
