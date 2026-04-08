'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams, notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { WFPProject } from '@/types/wfp'
import { ETAPAS_WFP } from '@/types/wfp'

type EtapaStatus = { etapaId: number; status: string }

const STATUS_LABEL: Record<string, string> = {
  bloqueada:    'Bloqueada',
  disponivel:   'Disponível',
  em_andamento: 'Em andamento',
  concluida:    'Concluída',
}

const STATUS_COLOR: Record<string, string> = {
  bloqueada:    'text-text-disabled bg-bg-subtle',
  disponivel:   'text-accent-text bg-accent-light',
  em_andamento: 'text-warning bg-warning-subtle',
  concluida:    'text-success bg-success-subtle',
}

const PREREQS = [
  'Patrocinador executivo identificado (CEO, COO ou CFO)',
  'Acesso aos dados financeiros básicos confirmado (custo total de pessoas, receita, margem por área)',
  'Janela de tempo confirmada com o executivo (quando ele precisa dessa resposta?)',
  'Expectativa nivelada sobre o entregável (diagnóstico + cenários, não um plano perfeito)',
  'Autonomia mínima para propor mudanças (mesmo que não as aprove sozinha)',
]

export default function ProjectCanvasPage() {
  const params = useParams()
  const projectId = params.projectId as string
  const [projeto, setProjeto] = useState<WFPProject | null>(null)
  const [loading, setLoading] = useState(true)
  const [prereqCheck, setPrereqCheck] = useState<boolean[]>(Array(5).fill(false))
  const [showPrereq, setShowPrereq] = useState(false)

  useEffect(() => {
    const supabase = createClient()
    supabase
      .from('wfp_projects')
      .select('*')
      .eq('id', projectId)
      .single()
      .then(({ data, error }) => {
        if (error || !data) { notFound(); return }
        setProjeto(data as WFPProject)
        setLoading(false)
      })
  }, [projectId])

  if (loading) return <CanvasSkeleton />
  if (!projeto) return null

  const etapas = projeto.etapas_status ?? []
  const concluidas = etapas.filter((e: EtapaStatus) => e.status === 'concluida').length
  const p = (projeto.parametrizacao as unknown as Record<string, Record<string, unknown>>)
  const identidade = p?.identidadeEmpresa ?? {}
  const momento = p?.momentoEstrategico ?? {}
  const financeiro = p?.contextoFinanceiro ?? {}
  const maturidade = p?.maturidadeOrganizacional ?? {}
  const politico = p?.contextoPolitico ?? {}

  const prereqCount = prereqCheck.filter(Boolean).length

  return (
    <div className="max-w-content mx-auto space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-text-tertiary">
        <Link href="/dashboard/modulo/workforce-planning" className="hover:text-text-primary transition-colors">
          Workforce Planning
        </Link>
        <span>/</span>
        <span className="text-text-primary">{projeto.nome}</span>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h1 className="display-lg text-text-primary">{projeto.nome}</h1>
          <div className="flex items-center gap-3 flex-wrap">
            {identidade.numColaboradores && (
              <span className="body-sm text-text-tertiary">
                {COL_LABEL[identidade.numColaboradores as string] ?? identidade.numColaboradores} colaboradores
              </span>
            )}
            {momento.momento && (
              <>
                <span className="text-border-medium">·</span>
                <span className="body-sm text-text-tertiary">{MOMENTO_LABEL[momento.momento as string] ?? momento.momento}</span>
              </>
            )}
            <span className="text-border-medium">·</span>
            <span className="body-sm text-text-tertiary">{concluidas}/6 etapas</span>
          </div>
        </div>
        <Link
          href={`/dashboard/modulo/workforce-planning/${projectId}/metricas`}
          className="text-xs text-accent hover:underline whitespace-nowrap shrink-0"
        >
          Ver métricas →
        </Link>
      </div>

      {/* Progress bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between">
          <span className="label-sm text-text-tertiary">Progresso geral</span>
          <span className="mono-sm text-text-tertiary">{Math.round((concluidas / 6) * 100)}%</span>
        </div>
        <div className="h-2 bg-bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-accent rounded-full transition-all duration-500"
            style={{ width: `${(concluidas / 6) * 100}%` }}
          />
        </div>
      </div>

      {/* Pré-requisitos */}
      <section className="border border-border-light rounded-lg overflow-hidden">
        <button
          onClick={() => setShowPrereq((s) => !s)}
          className="w-full flex items-center justify-between px-5 py-3.5 bg-bg-surface hover:bg-bg-subtle transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="label-sm text-text-secondary">Pré-requisitos antes de começar</span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
              prereqCount === 5 ? 'bg-success-subtle text-success' : 'bg-warning-subtle text-warning'
            }`}>
              {prereqCount}/5 confirmados
            </span>
          </div>
          <svg
            className={`w-4 h-4 text-text-tertiary transition-transform ${showPrereq ? 'rotate-180' : ''}`}
            viewBox="0 0 16 16" fill="none"
          >
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        {showPrereq && (
          <div className="px-5 py-4 bg-bg-surface border-t border-border-light space-y-3">
            {prereqCount < 5 && (
              <p className="text-xs text-warning bg-warning-subtle border border-warning-border rounded px-3 py-2">
                Resolva isso antes. Rodar sem esses pré-requisitos é o erro que mais faz esse projeto virar relatório de gaveta.
              </p>
            )}
            {PREREQS.map((req, i) => (
              <label key={i} className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={prereqCheck[i]}
                  onChange={(e) => {
                    const next = [...prereqCheck]
                    next[i] = e.target.checked
                    setPrereqCheck(next)
                  }}
                  className="mt-0.5 shrink-0"
                />
                <span className={`text-xs ${prereqCheck[i] ? 'text-text-tertiary line-through' : 'text-text-secondary'}`}>
                  {req}
                </span>
              </label>
            ))}
          </div>
        )}
      </section>

      {/* Etapas */}
      <section>
        <p className="label-md text-text-tertiary mb-4">Etapas do projeto</p>
        <div className="space-y-3">
          {ETAPAS_WFP.map((def) => {
            const etapaStatus = etapas.find((e: EtapaStatus) => e.etapaId === def.id)
            const status = etapaStatus?.status ?? 'bloqueada'
            const desbloqueada = status !== 'bloqueada'

            return (
              <div
                key={def.id}
                className={`border rounded-lg p-5 transition-all ${
                  desbloqueada
                    ? 'border-border-light bg-bg-surface hover:border-border-medium'
                    : 'border-border-light bg-bg-subtle opacity-60'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-9 h-9 rounded flex items-center justify-center shrink-0 ${
                      status === 'concluida'   ? 'bg-success text-white' :
                      status === 'em_andamento' ? 'bg-accent text-white' :
                      desbloqueada            ? 'bg-accent-light text-accent-text' :
                                                'bg-bg-muted text-text-disabled'
                    }`}>
                      {status === 'concluida' ? (
                        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                          <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      ) : (
                        <span className="mono-sm font-medium">{def.numero}</span>
                      )}
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="body-sm font-medium text-text-primary">{def.nome}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLOR[status]}`}>
                          {STATUS_LABEL[status]}
                        </span>
                      </div>
                      <p className="text-xs text-text-tertiary">{def.descricao}</p>
                      <div className="flex items-center gap-3 pt-1">
                        <span className="text-xs text-text-tertiary">⏱ {def.tempoEstimado}</span>
                        <span className="text-xs text-text-tertiary">{def.frameworks.length} frameworks</span>
                      </div>
                    </div>
                  </div>
                  {desbloqueada && (
                    <Link
                      href={`/dashboard/modulo/workforce-planning/${projectId}/etapa/${def.id}`}
                      className={`shrink-0 px-4 py-2 rounded text-xs font-medium transition-colors ${
                        status === 'concluida'
                          ? 'bg-bg-subtle text-text-secondary hover:bg-bg-muted'
                          : 'bg-accent text-white hover:bg-accent-hover'
                      }`}
                    >
                      {status === 'concluida' ? 'Ver análise' : status === 'em_andamento' ? 'Continuar →' : 'Iniciar →'}
                    </Link>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Contexto parametrizado */}
      <section className="border border-border-light rounded-lg p-5 space-y-4 bg-bg-surface">
        <p className="label-md text-text-tertiary">Contexto parametrizado</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {identidade.setor && <ContextItem label="Setor" value={SETOR_LABEL[identidade.setor as string] ?? (identidade.setor as string)} />}
          {identidade.mercado && <ContextItem label="Mercado" value={MERCADO_LABEL[identidade.mercado as string] ?? (identidade.mercado as string)} />}
          {financeiro.pressaoBudget && <ContextItem label="Pressão de budget" value={PRESSAO_LABEL[financeiro.pressaoBudget as string] ?? (financeiro.pressaoBudget as string)} />}
          {financeiro.liderBudget && <ContextItem label="Quem lidera budget" value={LIDER_LABEL[financeiro.liderBudget as string] ?? (financeiro.liderBudget as string)} />}
          {maturidade.historicoWFP && <ContextItem label="Histórico WFP" value={HISTORICO_LABEL[maturidade.historicoWFP as string] ?? (maturidade.historicoWFP as string)} />}
          {politico.reacaoCEO && <ContextItem label="Reação do CEO" value={CEO_LABEL[politico.reacaoCEO as string] ?? (politico.reacaoCEO as string)} />}
        </div>
        {momento.metaProximoAno && (
          <ContextItem label="Meta do próximo ano" value={momento.metaProximoAno as string} className="col-span-full" />
        )}
        {politico.maiorRiscoPolitico && (
          <div className="border-t border-border-light pt-4">
            <p className="label-sm text-text-tertiary mb-1">Risco político identificado</p>
            <p className="text-xs text-warning bg-warning-subtle border border-warning-border rounded px-3 py-2">
              {politico.maiorRiscoPolitico as string}
            </p>
          </div>
        )}
      </section>
    </div>
  )
}

function ContextItem({ label, value, className = '' }: { label: string; value: string; className?: string }) {
  return (
    <div className={`space-y-0.5 ${className}`}>
      <p className="label-sm text-text-tertiary">{label}</p>
      <p className="body-sm text-text-primary">{value}</p>
    </div>
  )
}

function CanvasSkeleton() {
  return (
    <div className="max-w-content mx-auto space-y-6 animate-pulse">
      <div className="h-4 w-48 bg-bg-muted rounded" />
      <div className="h-8 w-72 bg-bg-muted rounded" />
      <div className="h-2 w-full bg-bg-muted rounded-full" />
      <div className="space-y-3">
        {[1, 2, 3].map((i) => <div key={i} className="h-20 bg-bg-muted rounded-lg" />)}
      </div>
    </div>
  )
}

const SETOR_LABEL: Record<string, string> = {
  tech: 'Tech', fintech: 'Fintech', varejo: 'Varejo', saude: 'Saúde',
  industria: 'Indústria', servicos: 'Serviços', educacao: 'Educação', outro: 'Outro',
}
const MERCADO_LABEL: Record<string, string> = {
  b2b: 'B2B', b2c: 'B2C', b2b2c: 'B2B2C', governo: 'Governo', misto: 'Misto',
}
const COL_LABEL: Record<string, string> = {
  '50_100': '50–100', '101_200': '101–200', '201_400': '201–400', '401_800': '401–800',
}
const MOMENTO_LABEL: Record<string, string> = {
  hypergrowth: 'Hypergrowth', crescimento_saudavel: 'Crescimento saudável',
  eficiencia_margem: 'Eficiência e margem', transformacao: 'Transformação',
  reestruturacao: 'Reestruturação', turnaround: 'Turnaround', ma: 'M&A',
}
const PRESSAO_LABEL: Record<string, string> = {
  alta_cortes: 'Alta — cortes necessários', moderada_otimizacao: 'Moderada — otimização',
  baixa_crescimento: 'Baixa — crescimento possível', sem_pressao: 'Sem pressão',
}
const LIDER_LABEL: Record<string, string> = {
  ceo: 'CEO', cfo: 'CFO', coo: 'COO', chro: 'CHRO', comite: 'Comitê', nao_definido: 'Não definido',
}
const HISTORICO_LABEL: Record<string, string> = {
  nunca: 'Nunca fizemos', tentamos: 'Tentamos, não funcionou',
  basico: 'Fazemos de forma básica', bem: 'Fazemos bem',
}
const CEO_LABEL: Record<string, string> = {
  cetico: 'Cético (exige muito dado)', aberto: 'Aberto (exige clareza)',
  parceiro: 'Parceiro (co-constrói)', nao_se_envolve: 'Não se envolve',
}
