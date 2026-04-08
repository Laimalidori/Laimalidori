'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { ETAPAS_WFP } from '@/types/wfp'
import type { WFPProject, EtapaDefinicao } from '@/types/wfp'
import { WFPStageChat } from '@/components/wfp/WFPStageChat'
import { EtapaFrameworks } from '@/components/wfp/EtapaFrameworks'

export default function EtapaPage() {
  const params = useParams()
  const projectId = params.projectId as string
  const stageNum = parseInt(params.stage as string, 10) as 1 | 2 | 3 | 4 | 5 | 6

  const [projeto, setProjeto] = useState<WFPProject | null>(null)
  const [loading, setLoading] = useState(true)
  const [completando, setCompletando] = useState(false)

  const def: EtapaDefinicao | undefined = ETAPAS_WFP.find((e) => e.id === stageNum)

  const loadProjeto = useCallback(async () => {
    const supabase = createClient()
    const { data } = await supabase
      .from('wfp_projects')
      .select('*')
      .eq('id', projectId)
      .single()
    if (data) setProjeto(data as WFPProject)
    setLoading(false)
  }, [projectId])

  useEffect(() => { loadProjeto() }, [loadProjeto])

  async function handleConcluir() {
    if (!projeto) return
    setCompletando(true)
    const supabase = createClient()

    const etapas = projeto.etapas_status ?? []
    const updated = etapas.map((e) => {
      if (e.etapaId === stageNum)       return { ...e, status: 'concluida', concluidoEm: new Date().toISOString() }
      if (e.etapaId === stageNum + 1 && e.status === 'bloqueada') return { ...e, status: 'disponivel' }
      return e
    })

    await supabase
      .from('wfp_projects')
      .update({ etapas_status: updated })
      .eq('id', projectId)

    setCompletando(false)
    window.location.href = `/dashboard/modulo/workforce-planning/${projectId}`
  }

  if (loading || !def) {
    return <div className="h-64 flex items-center justify-center text-text-tertiary body-sm">Carregando…</div>
  }

  const etapaStatus = (projeto?.etapas_status ?? []).find((e) => e.etapaId === stageNum)
  const isConcluida = etapaStatus?.status === 'concluida'

  return (
    <div className="max-w-content mx-auto space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-text-tertiary">
        <Link href="/dashboard/modulo/workforce-planning" className="hover:text-text-primary transition-colors">
          Workforce Planning
        </Link>
        <span>/</span>
        <Link
          href={`/dashboard/modulo/workforce-planning/${projectId}`}
          className="hover:text-text-primary transition-colors"
        >
          {projeto?.nome ?? 'Projeto'}
        </Link>
        <span>/</span>
        <span className="text-text-primary">{def.nome}</span>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-3">
            <span className="mono-sm text-text-tertiary">Etapa {def.numero}</span>
            {isConcluida && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-success-subtle text-success font-medium">
                Concluída
              </span>
            )}
          </div>
          <h1 className="display-md text-text-primary">{def.nome}</h1>
          <p className="body-sm text-text-secondary max-w-2xl">{def.objetivo}</p>
          <p className="text-xs text-text-tertiary">⏱ {def.tempoEstimado}</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {stageNum > 1 && (
            <Link
              href={`/dashboard/modulo/workforce-planning/${projectId}/etapa/${stageNum - 1}`}
              className="text-xs text-text-tertiary hover:text-text-primary transition-colors"
            >
              ← Anterior
            </Link>
          )}
          {stageNum < 6 && (
            <Link
              href={`/dashboard/modulo/workforce-planning/${projectId}/etapa/${stageNum + 1}`}
              className="text-xs text-text-tertiary hover:text-text-primary transition-colors"
            >
              Próxima →
            </Link>
          )}
        </div>
      </div>

      {/* Frameworks, inputs e outputs */}
      <EtapaFrameworks def={def} stageNum={stageNum} />

      {/* Chat principal */}
      <section className="space-y-3">
        <p className="label-md text-text-tertiary">Análise com Nina</p>
        <WFPStageChat
          projectId={projectId}
          stageNum={stageNum}
          projeto={projeto}
          etapaDef={def}
        />
      </section>

      {/* Concluir etapa */}
      {!isConcluida && (
        <div className="border-t border-border-light pt-5 flex items-center justify-between">
          <p className="body-sm text-text-tertiary max-w-md">
            Quando terminar a análise desta etapa, marque como concluída para desbloquear a próxima.
          </p>
          <button
            onClick={handleConcluir}
            disabled={completando}
            className="bg-success text-white px-5 py-2.5 rounded body-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            {completando ? 'Salvando…' : '✓ Marcar como concluída'}
          </button>
        </div>
      )}
    </div>
  )
}
