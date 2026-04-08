'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { WFPProject } from '@/types/wfp'
import { ETAPAS_WFP } from '@/types/wfp'

const STATUS_LABEL: Record<string, string> = {
  bloqueada:    'Bloqueada',
  disponivel:   'Disponível',
  em_andamento: 'Em andamento',
  concluida:    'Concluída',
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

  const etapas = projeto?.etapas_status ?? []
  const concluidas = etapas.filter((e) => e.status === 'concluida').length
  const progresso = Math.round((concluidas / 6) * 100)

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
      <div className="space-y-1">
        <h1 className="display-lg text-text-primary">Métricas do Projeto</h1>
        <p className="body-sm text-text-secondary max-w-2xl">
          Os 4 KPIs do método WFP. São calculados ao final do processo — durante as etapas, você constrói as bases para medi-los.
        </p>
      </div>

      {/* Progresso */}
      <div className="border border-border-light rounded-lg p-5 bg-bg-surface space-y-3">
        <div className="flex items-center justify-between">
          <p className="label-md text-text-tertiary">Progresso geral</p>
          <span className="mono-sm text-text-tertiary">{concluidas}/6 etapas · {progresso}%</span>
        </div>
        <div className="h-2 bg-bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-accent rounded-full transition-all duration-500"
            style={{ width: `${progresso}%` }}
          />
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 pt-1">
          {ETAPAS_WFP.map((def) => {
            const etapaStatus = etapas.find((e) => e.etapaId === def.id)
            const status = etapaStatus?.status ?? 'bloqueada'
            return (
              <div key={def.id} className="space-y-1">
                <div className={`h-1 rounded-full ${
                  status === 'concluida'    ? 'bg-success' :
                  status === 'em_andamento' ? 'bg-accent' :
                  status === 'disponivel'   ? 'bg-border-medium' :
                                              'bg-bg-muted'
                }`} />
                <p className="text-xs text-text-tertiary truncate">{def.numero}. {def.nome.split(' ')[0]}</p>
                <p className="text-xs text-text-disabled">{STATUS_LABEL[status]}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Os 4 KPIs */}
      <section className="space-y-4">
        <div>
          <p className="label-md text-text-tertiary">Os 4 KPIs do método</p>
          <p className="text-xs text-text-tertiary mt-1">
            Definidos no início para medir se o WFP entregou o que prometeu. Coletados 90 dias após a decisão.
          </p>
        </div>

        <div className="space-y-3">
          <KPIRow
            numero="01"
            label="Erro de custo total de pessoas"
            meta="< 5%"
            descricao="Diferença entre o custo total de pessoas projetado no plano e o custo realizado 90 dias após a decisão. Mede se o diagnóstico financeiro da Etapa 1 foi preciso."
            comoMedir="(Custo realizado − Custo projetado) ÷ Custo projetado × 100"
            status={concluidas >= 1 ? 'mensuravel' : 'pendente'}
          />
          <KPIRow
            numero="02"
            label="Velocidade de replanejamento"
            meta="< 30 dias"
            descricao="Tempo em dias para revisar o plano quando o negócio muda (novo cenário econômico, mudança estratégica, M&A). Mede a agilidade do processo construído."
            comoMedir="Contado a partir do gatilho de mudança até a nova versão do plano aprovada"
            status={concluidas >= 6 ? 'mensuravel' : 'pendente'}
          />
          <KPIRow
            numero="03"
            label="Taxa de decisão na 1ª rodada"
            meta="> 70%"
            descricao="Percentual de decisões sobre estrutura e pessoas aprovadas sem precisar de retrabalho. Mede a qualidade da Etapa 6 (cenários) e do alinhamento executivo construído ao longo do processo."
            comoMedir="Decisões aprovadas de primeira ÷ Total de decisões levadas ao board"
            status={concluidas >= 6 ? 'mensuravel' : 'pendente'}
          />
          <KPIRow
            numero="04"
            label="Acurácia da lente de realidade"
            meta="> 80%"
            descricao="Percentual dos riscos identificados na Etapa 5 (Lente de Realidade) que de fato se materializaram. Mede se a análise de contexto foi honesta e útil — não otimista demais."
            comoMedir="Riscos que se materializaram e foram previstos ÷ Total de riscos previstos como amarelo ou vermelho"
            status={concluidas >= 5 ? 'mensuravel' : 'pendente'}
          />
        </div>
      </section>

      {/* Nota sobre coleta */}
      <div className="border border-border-light rounded-lg p-4 bg-bg-surface space-y-2">
        <p className="label-sm text-text-secondary">Como usar esses KPIs</p>
        <p className="text-xs text-text-tertiary leading-relaxed">
          Esses KPIs não são coletados automaticamente — são metas para você definir antes de apresentar o plano ao board.
          Ao finalizar a Etapa 6, registre as premissas (custo projetado, riscos previstos, decisões a aprovar).
          90 dias após a aprovação, compare com o realizado. Isso transforma o WFP num ciclo de aprendizado, não num relatório de gaveta.
        </p>
      </div>
    </div>
  )
}

function KPIRow({
  numero,
  label,
  meta,
  descricao,
  comoMedir,
  status,
}: {
  numero: string
  label: string
  meta: string
  descricao: string
  comoMedir: string
  status: 'pendente' | 'mensuravel'
}) {
  return (
    <div className="border border-border-light rounded-lg p-5 bg-bg-surface space-y-3">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <span className="mono-sm text-text-disabled shrink-0 mt-0.5">{numero}</span>
          <div className="space-y-0.5">
            <p className="body-sm font-medium text-text-primary">{label}</p>
            <p className="text-xs text-text-tertiary">{descricao}</p>
          </div>
        </div>
        <div className="shrink-0 text-right space-y-1">
          <p className="label-sm text-text-tertiary">Meta</p>
          <p className="mono-sm text-accent font-medium">{meta}</p>
        </div>
      </div>
      <div className="border-t border-border-light pt-3 flex items-start justify-between gap-4">
        <div className="space-y-0.5">
          <p className="label-sm text-text-tertiary">Como medir</p>
          <p className="text-xs text-text-secondary font-mono">{comoMedir}</p>
        </div>
        <span className={`shrink-0 text-xs px-2 py-0.5 rounded-full font-medium ${
          status === 'mensuravel'
            ? 'bg-success-subtle text-success'
            : 'bg-bg-muted text-text-disabled'
        }`}>
          {status === 'mensuravel' ? 'Mensurável' : 'Pendente etapas'}
        </span>
      </div>
    </div>
  )
}
