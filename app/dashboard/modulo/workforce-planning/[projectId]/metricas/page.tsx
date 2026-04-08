'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { WFPProject } from '@/types/wfp'

interface KPICard {
  label: string
  valor: string | number
  unidade?: string
  variacao?: number   // positivo = bom, negativo = ruim
  descricao: string
  cor: 'navy' | 'gold' | 'success' | 'warning'
}

export default function MetricasPage() {
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
      .then(({ data }) => {
        if (data) setProjeto(data as WFPProject)
        setLoading(false)
      })
  }, [projectId])

  if (loading) {
    return <div className="h-64 flex items-center justify-center text-text-tertiary body-sm">Carregando métricas…</div>
  }

  const p = (projeto?.parametrizacao as unknown) as Record<string, Record<string, unknown>>
  const dados = p?.dadosForcaTrabalho ?? {}
  const perfil = p?.perfilNegocio ?? {}
  const etapas = (projeto?.etapas as unknown as Array<{ etapaId: number; status: string }>) ?? []
  const concluidas = etapas.filter((e) => e.status === 'concluida').length

  // KPIs derivados dos dados parametrizados
  const turnover = Number(dados.turnoverAnual ?? 0)
  const numFunc = Number(perfil.numFuncionarios ?? 0)
  const custoTurnover = numFunc > 0 && turnover > 0
    ? Math.round((numFunc * (turnover / 100)) * 15000 / 1000)  // R$15k custo médio por saída
    : null

  const kpis: KPICard[] = [
    {
      label: 'Turnover Anual',
      valor: turnover > 0 ? `${turnover}%` : '—',
      descricao: 'Taxa de rotatividade da força de trabalho',
      cor: turnover > 20 ? 'warning' : 'success',
    },
    {
      label: 'Headcount Total',
      valor: numFunc > 0 ? numFunc.toLocaleString('pt-BR') : '—',
      unidade: 'colaboradores',
      descricao: 'Força de trabalho total parametrizada',
      cor: 'navy',
    },
    {
      label: 'Custo Estimado de Turnover',
      valor: custoTurnover ? `R$ ${custoTurnover}K/ano` : '—',
      descricao: 'Estimativa baseada em R$ 15k custo médio por saída',
      cor: 'gold',
    },
    {
      label: 'Progresso do Projeto',
      valor: `${concluidas}/6`,
      unidade: 'etapas',
      descricao: `${Math.round((concluidas / 6) * 100)}% do processo concluído`,
      cor: concluidas === 6 ? 'success' : 'navy',
    },
  ]

  return (
    <div className="max-w-content mx-auto space-y-8">
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
        <span className="text-text-primary">Métricas</span>
      </div>

      {/* Header */}
      <div>
        <h1 className="display-lg text-text-primary">Dashboard de Métricas</h1>
        <p className="body-sm text-text-secondary mt-1">
          KPIs derivados da parametrização. Serão enriquecidos com as análises de cada etapa.
        </p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 gap-4">
        {kpis.map((kpi, i) => (
          <KPICard key={i} kpi={kpi} />
        ))}
      </div>

      {/* Progresso por etapa */}
      <section className="border border-border-light rounded-lg p-5 space-y-4 bg-bg-surface">
        <p className="label-md text-text-tertiary">Progresso por etapa</p>
        <div className="space-y-2.5">
          {etapas.map((e) => {
            const pct = e.status === 'concluida' ? 100 : e.status === 'em_andamento' ? 50 : e.status === 'disponivel' ? 0 : 0
            const label = { concluida: 'Concluída', em_andamento: 'Em andamento', disponivel: 'Disponível', bloqueada: 'Bloqueada' }[e.status] ?? e.status
            return (
              <div key={e.etapaId} className="flex items-center gap-3">
                <span className="mono-sm text-text-tertiary w-6 shrink-0">0{e.etapaId}</span>
                <div className="flex-1 h-1.5 bg-bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      e.status === 'concluida' ? 'bg-success' : e.status === 'em_andamento' ? 'bg-accent' : 'bg-transparent'
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-xs text-text-tertiary w-24 text-right shrink-0">{label}</span>
              </div>
            )
          })}
        </div>
      </section>

      {/* Info */}
      <div className="bg-accent-light border border-accent-border rounded-lg p-4">
        <p className="body-sm text-accent-text">
          <strong>Nota:</strong> As métricas serão expandidas conforme você avança nas etapas de análise.
          Ao concluir a Etapa 1 (Diagnóstico), novos KPIs de composição e custo serão calculados automaticamente.
        </p>
      </div>
    </div>
  )
}

function KPICard({ kpi }: { kpi: KPICard }) {
  const colors = {
    navy:    'border-accent-border bg-accent-light text-accent',
    gold:    'border-gold-border bg-gold-light text-gold',
    success: 'border-success-border bg-success-bg text-success',
    warning: 'border-warning-border bg-warning-bg text-warning',
  }

  return (
    <div className={`border rounded-lg p-5 space-y-2 ${colors[kpi.cor]}`}>
      <p className="label-sm opacity-70">{kpi.label}</p>
      <div className="flex items-baseline gap-2">
        <span className="display-md font-medium">{kpi.valor}</span>
        {kpi.unidade && <span className="body-sm opacity-60">{kpi.unidade}</span>}
      </div>
      <p className="text-xs opacity-60">{kpi.descricao}</p>
    </div>
  )
}
