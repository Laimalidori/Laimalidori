'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { ETAPAS_WFP } from '@/types/wfp'
import type { WFPProject, EtapaDefinicao, WFPEtapaStatus } from '@/types/wfp'
import { WFPStageChat } from '@/components/wfp/WFPStageChat'
import { EtapaFrameworks } from '@/components/wfp/EtapaFrameworks'

const STATUS_COLOR: Record<string, string> = {
  concluida:    'text-success bg-success-subtle',
  em_andamento: 'text-warning bg-warning-subtle',
  disponivel:   'text-accent-text bg-accent-light',
  bloqueada:    'text-text-disabled bg-bg-subtle',
}

export default function EtapaPage() {
  const params    = useParams()
  const projectId = params.projectId as string
  const stageNum  = parseInt(params.stage as string, 10) as 1 | 2 | 3 | 4 | 5 | 6

  const [projeto,     setProjeto]     = useState<WFPProject | null>(null)
  const [loading,     setLoading]     = useState(true)
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

    const etapas  = projeto.etapas_status ?? []
    const updated = etapas.map((e) => {
      if (e.etapaId === stageNum)
        return { ...e, status: 'concluida', concluidoEm: new Date().toISOString() }
      if (e.etapaId === stageNum + 1 && e.status === 'bloqueada')
        return { ...e, status: 'disponivel' }
      return e
    })

    await supabase.from('wfp_projects').update({ etapas_status: updated }).eq('id', projectId)
    setCompletando(false)
    window.location.href = `/dashboard/modulo/workforce-planning/${projectId}`
  }

  if (loading || !def) {
    return (
      <div className="h-64 flex items-center justify-center text-text-tertiary body-sm">
        Carregando…
      </div>
    )
  }

  const etapas       = projeto?.etapas_status ?? []
  const etapaStatus  = etapas.find((e) => e.etapaId === stageNum)
  const isConcluida  = etapaStatus?.status === 'concluida'

  // Previous stages that are completed (for the synthesis panel)
  const prevStages: Array<WFPEtapaStatus & { def: EtapaDefinicao }> = etapas
    .filter((e) => e.etapaId < stageNum && e.status === 'concluida')
    .map((e) => ({ ...e, def: ETAPAS_WFP.find((d) => d.id === e.etapaId)! }))
    .filter((e) => !!e.def)

  return (
    <div className="max-w-[1200px] mx-auto space-y-5">
      {/* ── Breadcrumb ── */}
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

      {/* ── Top nav: prev / next ── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {isConcluida && (
            <span className="text-xs px-2.5 py-1 rounded-full bg-success-subtle text-success font-medium">
              ✓ Concluída
            </span>
          )}
        </div>
        <div className="flex items-center gap-4">
          {stageNum > 1 && (
            <Link
              href={`/dashboard/modulo/workforce-planning/${projectId}/etapa/${stageNum - 1}`}
              className="text-xs text-text-tertiary hover:text-text-primary transition-colors flex items-center gap-1"
            >
              ← Etapa anterior
            </Link>
          )}
          {stageNum < 6 && (
            <Link
              href={`/dashboard/modulo/workforce-planning/${projectId}/etapa/${stageNum + 1}`}
              className="text-xs text-text-tertiary hover:text-text-primary transition-colors flex items-center gap-1"
            >
              Próxima etapa →
            </Link>
          )}
        </div>
      </div>

      {/* ── 40 / 60 split ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-6 items-start">

        {/* ── Left panel (40%) — Stage context + synthesis ── */}
        <div className="space-y-5 lg:sticky lg:top-6">

          {/* Stage header */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="mono-sm text-text-tertiary">Etapa {def.numero}</span>
              <span className="text-border-medium">·</span>
              <span className="text-xs text-text-tertiary">{def.tempoEstimado}</span>
            </div>
            <h1 className="display-sm text-text-primary">{def.nome}</h1>
            <p className="body-sm text-text-secondary leading-relaxed">{def.objetivo}</p>
          </div>

          {/* Frameworks / Guia accordion */}
          <EtapaFrameworks def={def} stageNum={stageNum} />

          {/* Previous completed stages — synthesis */}
          {prevStages.length > 0 && (
            <div className="space-y-2">
              <p className="label-sm text-text-tertiary">Etapas anteriores</p>
              <div className="space-y-2">
                {prevStages.map((e) => (
                  <Link
                    key={e.etapaId}
                    href={`/dashboard/modulo/workforce-planning/${projectId}/etapa/${e.etapaId}`}
                    className="block border border-border-light rounded-lg px-4 py-3 bg-bg-surface hover:border-border-medium transition-all group"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="mono-sm text-text-disabled shrink-0">{e.def.numero}</span>
                        <span className="text-xs font-medium text-text-secondary group-hover:text-text-primary transition-colors truncate">
                          {e.def.nome}
                        </span>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${STATUS_COLOR[e.status]}`}>
                        Concluída
                      </span>
                    </div>
                    {e.resumo && (
                      <p className="text-xs text-text-tertiary mt-1.5 line-clamp-2">{e.resumo}</p>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Concluir etapa CTA */}
          {!isConcluida && (
            <div className="border border-border-light rounded-lg p-4 space-y-3 bg-bg-surface">
              <p className="text-xs text-text-tertiary leading-relaxed">
                Quando terminar a análise desta etapa, marque como concluída para desbloquear a próxima.
              </p>
              <button
                onClick={handleConcluir}
                disabled={completando}
                className="w-full bg-success text-white px-4 py-2.5 rounded body-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-60"
              >
                {completando ? 'Salvando…' : '✓ Marcar como concluída'}
              </button>
            </div>
          )}
        </div>

        {/* ── Right panel (60%) — Nina chat ── */}
        <div className="space-y-2">
          <p className="label-sm text-text-tertiary">Análise com Nina</p>
          <WFPStageChat
            projectId={projectId}
            stageNum={stageNum}
            projeto={projeto}
            etapaDef={def}
          />
        </div>
      </div>
    </div>
  )
}
