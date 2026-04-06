import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { ChevronLeft } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'

const TIPO_LABELS: Record<string, string> = {
  business_case: 'Business Case',
  projeto: 'Plano de Projeto',
  apresentacao_defesa: 'Apresentação: Defesa',
  apresentacao_tracking: 'Apresentação: Tracking',
  apresentacao_encerramento: 'Apresentação: Encerramento',
  pesquisa: 'Pesquisa de Mercado',
}

interface ArtefatoPageProps {
  params: Promise<{ id: string }>
}

export default async function ArtefatoPage({ params }: ArtefatoPageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data: artifact } = await supabase
    .from('artifacts')
    .select('*')
    .eq('id', id)
    .single()

  if (!artifact) notFound()

  const rendered = artifact.conteudo
    .replace(/^### (.+)$/gm, '<h3 class="font-serif text-[17px] font-medium text-[var(--text-primary)] mt-5 mb-2">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="font-serif text-[20px] font-medium text-[var(--text-primary)] mt-6 mb-3">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="font-serif text-[24px] font-light text-[var(--text-primary)] mt-8 mb-4">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-medium text-[var(--text-primary)]">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code class="text-[11px] bg-[var(--surface-subtle)] px-1 py-0.5 rounded">$1</code>')
    .replace(/^---$/gm, '<hr class="border-[var(--border)] my-5" />')
    .replace(/^\- (.+)$/gm, '<li class="ml-4 mb-1">$1</li>')
    .replace(/\n\n/g, '\n')

  return (
    <div>
      <Link
        href="/dashboard/history"
        className="inline-flex items-center gap-1 body-sm text-text-tertiary hover:text-text-secondary transition-colors mb-6"
      >
        <ChevronLeft size={14} />
        Histórico
      </Link>

      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="accent">{TIPO_LABELS[artifact.tipo] ?? artifact.tipo}</Badge>
            {artifact.pillar_name && (
              <Badge variant="default">{artifact.pillar_name}</Badge>
            )}
          </div>
          <h1 className="display-lg text-text-primary">{artifact.titulo}</h1>
          <p className="body-sm text-text-tertiary mt-1">
            {new Date(artifact.created_at).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </div>
      </div>

      <div
        className="prose-chat body-md text-text-secondary max-w-none"
        dangerouslySetInnerHTML={{ __html: rendered }}
      />
    </div>
  )
}
