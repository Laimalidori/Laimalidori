'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { ETAPAS_WFP } from '@/types/wfp'
import type { WFPProject, EtapaDefinicao } from '@/types/wfp'
import { WFPStageChat } from '@/components/wfp/WFPStageChat'
import { SintesePanel } from '@/components/wfp/SintesePanel'

/* ── Per-stage thesis quote ────────────────────────────────── */
const STAGE_QUOTE: Record<number, { text: string; author?: string }> = {
  1: { text: 'Chegar na reunião sabendo mais sobre a empresa do que o executivo espera que você saiba.', },
  2: { text: 'Responder a pergunta errada é pior do que não responder nada.', },
  3: { text: 'Onde forma fila, está o gargalo.', author: 'Goldratt' },
  4: { text: '20% das funções geram 80% da vantagem competitiva. O resto é custo com disfarcé de estratégia.', },
  5: { text: 'Todo plano tecnicamente correto pode falhar por razões que não estavam no plano.', },
  6: { text: 'Uma recomendação única força o executivo a dizer sim ou não. Três caminhos devolvem a decisão para quem tem o mandato.', },
}

/* ── Per-stage "why it matters" ────────────────────────────── */
const POR_QUE_IMPORTA: Record<number, string> = {
  1: 'Se você entrar na reunião sem saber os 4 números financeiros, perde credibilidade em 3 minutos. O executivo vai perguntar sobre custo/receita — você precisa ter a resposta antes dele.',
  2: 'Responder a pergunta errada é o erro que mais faz projetos de WFP virarem relatório de gaveta. Uma análise tecnicamente perfeita para a pergunta errada não serve para nada.',
  3: 'Sem mapa de gargalo, qualquer recomendação de alocação é baseada em feeling. Você vai recomendar contratação onde não há gargalo e deixar de contratar onde há.',
  4: 'Sem classificar o portfólio, você não sabe o que pode cortar sem destruir capacidade competitiva. Empresas têm 15–25% das funções em Legacy sem saber — e pagam por isso.',
  5: 'Todo plano tecnicamente correto pode falhar por razões políticas ou culturais. Esta etapa é o que separa o plano que vai para o board do plano que fica na gaveta.',
  6: 'Uma recomendação única força o executivo a aprovar ou negar tudo. Três cenários com trade-offs devolvem a decisão para quem tem o mandato — e aumentam a taxa de aprovação.',
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

  const etapas      = projeto?.etapas_status ?? []
  const etapaStatus = etapas.find((e) => e.etapaId === stageNum)
  const isConcluida = etapaStatus?.status === 'concluida'

  const p          = (projeto?.parametrizacao as unknown as Record<string, Record<string, unknown>>) ?? {}
  const id         = p.identidadeEmpresa     ?? {}
  const mom        = p.momentoEstrategico    ?? {}
  const fin        = p.contextoFinanceiro    ?? {}
  const quote      = STAGE_QUOTE[stageNum]
  const concluidas = etapas.filter((e) => e.status === 'concluida').length

  return (
    <div className="max-w-[1200px] mx-auto space-y-5">

      {/* ── Project context strip ── */}
      <div className="flex items-center justify-between gap-4 pb-1 border-b border-border-light">
        <div className="flex items-center gap-2 flex-wrap">
          <Link
            href={`/dashboard/modulo/workforce-planning/${projectId}`}
            className="text-xs font-medium text-text-primary hover:text-accent transition-colors"
          >
            {projeto?.nome ?? 'Projeto'}
          </Link>
          {!!id.nomeEmpresa && (
            <>
              <span className="text-border-medium">·</span>
              <span className="text-xs text-text-tertiary">{id.nomeEmpresa as string}</span>
            </>
          )}
          {!!id.setor && (
            <>
              <span className="text-border-medium">·</span>
              <span className="text-xs text-text-tertiary capitalize">{id.setor as string}</span>
            </>
          )}
          {!!mom.momento && (
            <>
              <span className="text-border-medium">·</span>
              <span className="text-xs text-text-tertiary">{MOMENTO_LABEL[mom.momento as string] ?? (mom.momento as string)}</span>
            </>
          )}
          {!!fin.pressaoBudget && (
            <>
              <span className="text-border-medium">·</span>
              <span className={`text-xs font-medium ${PRESSAO_COLOR[fin.pressaoBudget as string] ?? 'text-text-tertiary'}`}>
                {PRESSAO_SHORT[fin.pressaoBudget as string] ?? (fin.pressaoBudget as string)}
              </span>
            </>
          )}
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {/* Stage dots */}
          <div className="flex items-center gap-1.5">
            {ETAPAS_WFP.map((s) => {
              const st = etapas.find((e) => e.etapaId === s.id)?.status ?? 'bloqueada'
              return (
                <div
                  key={s.id}
                  title={s.nome}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    st === 'concluida'    ? 'bg-success' :
                    s.id === stageNum    ? 'bg-accent' :
                    st !== 'bloqueada'   ? 'bg-accent/30' :
                                          'bg-border-medium'
                  }`}
                />
              )
            })}
          </div>
          <span className="mono-sm text-text-tertiary">{concluidas}/6</span>
          {stageNum > 1 && (
            <Link
              href={`/dashboard/modulo/workforce-planning/${projectId}/etapa/${stageNum - 1}`}
              className="text-xs text-text-tertiary hover:text-text-primary transition-colors"
            >
              ←
            </Link>
          )}
          {stageNum < 6 && (
            <Link
              href={`/dashboard/modulo/workforce-planning/${projectId}/etapa/${stageNum + 1}`}
              className="text-xs text-text-tertiary hover:text-text-primary transition-colors"
            >
              →
            </Link>
          )}
          {isConcluida && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-success-subtle text-success font-medium">
              ✓ Concluída
            </span>
          )}
        </div>
      </div>

      {/* ── 40 / 60 split ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-6 items-start">

        {/* ── Left panel (40%) ── */}
        <div className="space-y-6 lg:sticky lg:top-6">

          {/* Stage header */}
          <div className="space-y-1.5">
            <span className="mono-sm text-text-tertiary">Etapa {def.numero} · {def.tempoEstimado}</span>
            <h1 className="display-sm text-text-primary">{def.nome}</h1>
          </div>

          {/* Why it matters */}
          <div className="border-l-2 border-accent pl-4 space-y-1">
            <p className="label-sm text-text-tertiary">Por que é crítica</p>
            <p className="text-xs text-text-secondary leading-relaxed">{POR_QUE_IMPORTA[stageNum]}</p>
          </div>

          {/* Síntese do projeto — visual stage list */}
          <SintesePanel projeto={projeto} stageNum={stageNum} projectId={projectId} />

          {/* Concluir */}
          {!isConcluida && (
            <div className="border border-border-light rounded-lg p-4 space-y-3 bg-bg-surface">
              <p className="text-xs text-text-tertiary leading-relaxed">
                Quando terminar, marque como concluída para desbloquear a próxima etapa.
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

        {/* ── Right panel (60%) — Amplif chat ── */}
        <div className="space-y-3">
          {/* Stage quote */}
          {quote && (
            <blockquote className="border-l-2 border-border-medium pl-4 py-0.5">
              <p className="text-xs text-text-tertiary italic leading-relaxed">
                &ldquo;{quote.text}&rdquo;
                {quote.author && (
                  <span className="not-italic font-medium text-text-disabled"> — {quote.author}</span>
                )}
              </p>
            </blockquote>
          )}

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

const MOMENTO_LABEL: Record<string, string> = {
  hypergrowth:          'Hypergrowth',
  crescimento_saudavel: 'Crescimento saudável',
  eficiencia_margem:    'Eficiência e margem',
  transformacao:        'Transformação',
  reestruturacao:       'Reestruturação',
  turnaround:           'Turnaround',
  ma:                   'M&A',
}
const PRESSAO_SHORT: Record<string, string> = {
  alta_cortes:          'Pressão alta',
  moderada_otimizacao:  'Pressão moderada',
  baixa_crescimento:    'Baixa pressão',
  sem_pressao:          'Sem pressão',
}
const PRESSAO_COLOR: Record<string, string> = {
  alta_cortes:         'text-danger',
  moderada_otimizacao: 'text-warning',
  baixa_crescimento:   'text-success',
  sem_pressao:         'text-text-tertiary',
}
