'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { HistoryFilterBar } from '@/components/history/HistoryFilter'
import { HistoryItem } from '@/components/history/HistoryItem'
import { ArtifactCard } from '@/components/history/ArtifactCard'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { groupByMonth } from '@/lib/utils'
import type { HistoryFilter } from '@/types/history'
import type { Conversation } from '@/types/chat'
import type { Artifact } from '@/types/history'

export default function HistoryPage() {
  const [filter, setFilter] = useState<HistoryFilter>('all')
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [artifacts, setArtifacts] = useState<Artifact[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const [convRes, artRes] = await Promise.all([
        supabase
          .from('conversations')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(100),
        supabase
          .from('artifacts')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(100),
      ])

      setConversations(convRes.data ?? [])
      setArtifacts(artRes.data ?? [])
      setLoading(false)
    }
    load()
  }, [])

  const filteredConversations = filter === 'all' || filter === 'chat'
    ? conversations
    : []

  const filteredArtifacts = filter === 'all'
    ? artifacts
    : artifacts.filter((a) => a.tipo.startsWith(filter))

  const combined = [
    ...filteredConversations.map((c) => ({ type: 'conv' as const, item: c, date: c.created_at })),
    ...filteredArtifacts.map((a) => ({ type: 'art' as const, item: a, date: a.created_at })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const groups = groupByMonth(combined.map((c) => ({ ...c, created_at: c.date })))

  return (
    <div>
      <h1 className="display-md text-text-primary mb-6">Histórico & Artefatos</h1>

      <HistoryFilterBar value={filter} onChange={setFilter} />

      {loading ? (
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-14 bg-surface-subtle rounded animate-pulse" />
          ))}
        </div>
      ) : combined.length === 0 ? (
        <div className="text-center py-16">
          <p className="body-md text-text-tertiary">Nenhuma conversa ou artefato encontrado.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(groups).map(([month, items]) => (
            <section key={month}>
              <SectionLabel className="mb-3 capitalize">{month}</SectionLabel>
              <div className="space-y-2">
                {items.map((entry) =>
                  entry.type === 'conv' ? (
                    <HistoryItem
                      key={`conv-${(entry.item as Conversation).id}`}
                      conversation={entry.item as Conversation}
                    />
                  ) : (
                    <ArtifactCard
                      key={`art-${(entry.item as Artifact).id}`}
                      artifact={entry.item as Artifact}
                    />
                  )
                )}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}
