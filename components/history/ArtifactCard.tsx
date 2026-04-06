'use client'

import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'
import type { Artifact } from '@/types/history'

const TIPO_LABELS: Record<string, string> = {
  business_case: 'Business Case',
  projeto: 'Plano de Projeto',
  apresentacao_defesa: 'Apresentação: Defesa',
  apresentacao_tracking: 'Apresentação: Tracking',
  apresentacao_encerramento: 'Apresentação: Encerramento',
  pesquisa: 'Pesquisa de Mercado',
}

interface ArtifactCardProps {
  artifact: Artifact
}

export function ArtifactCard({ artifact }: ArtifactCardProps) {
  return (
    <Link
      href={`/dashboard/artefato/${artifact.id}`}
      className="flex items-center gap-4 px-4 py-3 bg-surface border border-[var(--border)] rounded hover:border-[var(--border-strong)] hover:bg-surface-subtle transition-all group"
    >
      <div className="w-14 body-sm text-text-disabled text-right flex-shrink-0">
        {new Date(artifact.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
      </div>
      <div className="flex-1 min-w-0">
        <p className="body-md text-text-primary truncate">{artifact.titulo}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <Badge variant="accent">{TIPO_LABELS[artifact.tipo] ?? artifact.tipo}</Badge>
          {artifact.pillar_name && (
            <span className="body-sm text-text-tertiary">{artifact.pillar_name}</span>
          )}
        </div>
      </div>
      <span className="text-text-disabled group-hover:translate-x-0.5 transition-transform flex-shrink-0">→</span>
    </Link>
  )
}
