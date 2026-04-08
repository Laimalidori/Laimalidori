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

export default function ProjectCanvasPage() {
  const params = useParams()
  const projectId = params.projectId as string
  const [projeto, setProjeto] = useState<WFPProject | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()
    supabase
      .from('wfp_projects')
      .select('*')
      .eq('id', projectId)
      .single()
      .then(({ data, error }) => {
        if (error || !data) {
          notFound()
          return
        }
        setProjeto(data as WFPProject)
        setLoading(false)
      })
  }, [projectId])

  if (loading) return <CanvasSkeleton />
  if (!projeto) return null

  const etapas = (projeto.etapas as unknown as EtapaStatus[]) ?? []
  const concluidas = etapas.filter((e) => e.status === 'concluida').length
  const param = projeto.parametrizacao as ParametrizacaoWFP
  const perfil = param?.perfilNegocio
  const contexto = param?.contextoEstrategico
  const foco = param?.focoProjeto

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
          <div className="flex items-center gap-3">
            <span className="body-sm text-text-tertiary">
              {perfil?.numFuncionarios?.toLocaleString()} funcionários
            </span>
            <span className="text-border-medium">·</span>
            <span className="body-sm text-text-tertiary">
              Horizonte: {contexto?.horizonte?.replace('_', ' ')}
            </span>
            <span className="text-border-medium">·</span>
            <span className="body-sm text-text-tertiary">
              {concluidas}/6 etapas
            </span>
          </div>
        </div>
        <Link
          href={`/dashboard/modulo/workforce-planning/${projectId}/metricas`}
          className="text-xs text-accent hover:underline whitespace-nowrap"
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

      {/* Etapas — grid */}
      <section>
        <p className="label-md text-text-tertiary mb-4">Etapas do projeto</p>
        <div className="space-y-3">
          {ETAPAS_WFP.map((def) => {
            const etapaStatus = etapas.find((e) => e.etapaId === def.id)
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
                    {/* Número */}
                    <div className={`w-9 h-9 rounded flex items-center justify-center shrink-0 ${
                      status === 'concluida'
                        ? 'bg-success text-white'
                        : status === 'em_andamento'
                        ? 'bg-accent text-white'
                        : desbloqueada
                        ? 'bg-accent-light text-accent-text'
                        : 'bg-bg-muted text-text-disabled'
                    }`}>
                      {status === 'concluida' ? (
                        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                          <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      ) : (
                        <span className="mono-sm font-medium">{def.numero}</span>
                      )}
                    </div>

                    {/* Info */}
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <h3 className="body-sm font-medium text-text-primary">{def.nome}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLOR[status]}`}>
                          {STATUS_LABEL[status]}
                        </span>
                      </div>
                      <p className="text-xs text-text-tertiary">{def.descricao}</p>
                      <div className="flex items-center gap-3 pt-1">
                        <span className="text-xs text-text-tertiary">⏱ {def.tempoEstimado}</span>
                        <span className="text-xs text-text-tertiary">
                          {def.frameworks.length} frameworks
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
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

      {/* Contexto do projeto */}
      <section className="border border-border-light rounded-lg p-5 space-y-4 bg-bg-surface">
        <p className="label-md text-text-tertiary">Contexto parametrizado</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {perfil?.setor && (
            <ContextItem label="Setor" value={SETOR_LABEL[perfil.setor] ?? perfil.setor} />
          )}
          {perfil?.faturamentoFaixa && (
            <ContextItem label="Faturamento" value={FATURAMENTO_LABEL[perfil.faturamentoFaixa] ?? perfil.faturamentoFaixa} />
          )}
          {perfil?.estagio && (
            <ContextItem label="Estágio" value={ESTAGIO_LABEL[perfil.estagio] ?? perfil.estagio} />
          )}
          {foco?.tipo && (
            <ContextItem label="Tipo de projeto" value={TIPO_LABEL[foco.tipo] ?? foco.tipo} />
          )}
          {foco?.prioridade && (
            <ContextItem label="Prioridade" value={PRIORIDADE_LABEL[foco.prioridade] ?? foco.prioridade} />
          )}
          {contexto?.mandatoRH && (
            <ContextItem label="Mandato RH" value={contexto.mandatoRH} className="col-span-2 md:col-span-3" />
          )}
        </div>
        {contexto?.drivers && contexto.drivers.length > 0 && (
          <div>
            <p className="label-sm text-text-tertiary mb-2">Drivers estratégicos</p>
            <div className="flex flex-wrap gap-2">
              {contexto.drivers.map((d, i) => (
                <span key={i} className="text-xs bg-bg-subtle border border-border-light rounded px-2.5 py-1 text-text-secondary">
                  {d}
                </span>
              ))}
            </div>
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
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-20 bg-bg-muted rounded-lg" />
        ))}
      </div>
    </div>
  )
}

// Display labels
type ParametrizacaoWFP = {
  perfilNegocio: { setor: string; faturamentoFaixa: string; estagio: string; numFuncionarios: number }
  contextoEstrategico: { horizonte: string; drivers: string[]; mandatoRH?: string }
  focoProjeto: { tipo: string; prioridade: string }
}
const SETOR_LABEL: Record<string, string> = {
  tecnologia: 'Tecnologia', financeiro: 'Financeiro', saude: 'Saúde', varejo: 'Varejo',
  industria: 'Indústria', servicos: 'Serviços', educacao: 'Educação', energia: 'Energia',
  agronegocio: 'Agronegócio', outro: 'Outro',
}
const FATURAMENTO_LABEL: Record<string, string> = {
  ate_50m: 'Até R$ 50M', '50m_200m': 'R$ 50–200M', '200m_1b': 'R$ 200M–1B',
  '1b_5b': 'R$ 1–5B', acima_5b: 'Acima de R$ 5B',
}
const ESTAGIO_LABEL: Record<string, string> = {
  startup: 'Startup', crescimento: 'Crescimento', maturidade: 'Maturidade',
  transformacao: 'Transformação', consolidacao: 'Consolidação',
}
const TIPO_LABEL: Record<string, string> = {
  diagnostico_inicial: 'Diagnóstico inicial', planejamento_anual: 'Planejamento anual',
  reestruturacao: 'Reestruturação', crescimento_acelerado: 'Crescimento acelerado',
  reducao_headcount: 'Redução de headcount', transformacao_digital: 'Transformação digital',
  fusao_aquisicao: 'Fusão & Aquisição',
}
const PRIORIDADE_LABEL: Record<string, string> = {
  custo: 'Otimizar custo', capacidade: 'Aumentar capacidade',
  competencias: 'Desenvolver competências', estrutura: 'Redesenhar estrutura',
}
