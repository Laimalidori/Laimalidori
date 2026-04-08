'use client'

import { useRouter } from 'next/navigation'
import { TOOLS } from '@/lib/agents/pillars'
import { useChatStore } from '@/store/chat'

export function ToolsGrid() {
  const router = useRouter()
  const { clearActive } = useChatStore()

  function handleToolSelect(prompt: string) {
    clearActive()
    const params = new URLSearchParams({ tool: prompt })
    router.push(`/dashboard?${params.toString()}`)
  }

  return (
    <div className="flex flex-wrap gap-2">
      {TOOLS.map((tool) => (
        <button
          key={tool.id}
          onClick={() => handleToolSelect(tool.prompt)}
          className="px-3 py-2 bg-bg-surface border border-border-light rounded-lg hover:border-border-medium hover:bg-bg-subtle transition-all text-left group"
        >
          <span className="text-xs font-medium text-text-secondary group-hover:text-text-primary transition-colors block">
            {tool.name}
          </span>
          <span className="text-[11px] text-text-tertiary leading-snug">{tool.description}</span>
        </button>
      ))}
    </div>
  )
}
