'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import type { WFPProject } from '@/types/wfp'
import { ETAPAS_WFP } from '@/types/wfp'

export default function WFPModulePage() {
  const [projetos, setProjetos] = useState<WFPProject[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()
    supabase
      .from('wfp_projects')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setProjetos((data as WFPProject[]) ?? [])
        setLoading(false)
      })
  }, [])

  return (
    <div className="max-w-content mx-auto space-y-10">
      {/* Header */}
      <div className="space-y-2">
        <p className="label-sm text-text-tertiary">Módulo 01 · Estratégia & Organização</p>
        <h1 className="display-xl text-text-primary">Workforce Planning</h1>
        <p className="body-md text-text-secondary max-w-2xl">
          Planejamento estratégico da força de trabalho — do diagnóstico ao plano de ação.
          A Nina conduz você por 6 etapas estruturadas, entregando análises, frameworks e apresentações prontas.
        </p>
      </div>

      {/* O que você vai construir */}
      <section>
        <p className="label-md text-text-tertiary mb-5">O que você vai construir</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {ETAPAS_WFP.map((etapa) => (
            <div
              key={etapa.id}
              className="bg-bg-surface border border-border-light rounded-lg p-4 space-y-1"
            >
              <p className="mono-sm text-text-tertiary">{etapa.numero}</p>
              <p className="body-sm font-medium text-text-primary">{etapa.nome}</p>
              <p className="text-xs text-text-tertiary">{etapa.tempoEstimado}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Projetos existentes */}
      {!loading && projetos.length > 0 && (
        <section>
          <p className="label-md text-text-tertiary mb-4">Projetos em andamento</p>
          <div className="space-y-3">
            {projetos.map((projeto) => {
              const etapas = (projeto.etapas as unknown as Array<{ etapaId: number; status: string }>) ?? []
              const concluidas = etapas.filter((e) => e.status === 'concluida').length
              const progresso = Math.round((concluidas / 6) * 100)

              return (
                <Link
                  key={projeto.id}
                  href={`/dashboard/modulo/workforce-planning/${projeto.id}`}
                  className="flex items-center justify-between bg-bg-surface border border-border-light rounded-lg px-5 py-4 hover:border-border-medium transition-colors group"
                >
                  <div className="space-y-1">
                    <p className="body-sm font-medium text-text-primary group-hover:text-accent transition-colors">
                      {projeto.nome}
                    </p>
                    <p className="text-xs text-text-tertiary">
                      {concluidas} de 6 etapas concluídas
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-24 h-1.5 bg-bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent rounded-full transition-all"
                        style={{ width: `${progresso}%` }}
                      />
                    </div>
                    <span className="mono-sm text-text-tertiary">{progresso}%</span>
                    <svg className="w-4 h-4 text-text-tertiary" viewBox="0 0 16 16" fill="none">
                      <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="pt-2">
        <Link
          href="/dashboard/modulo/workforce-planning/novo"
          className="inline-flex items-center gap-2 bg-accent text-white px-6 py-3 rounded font-medium body-sm hover:bg-accent-hover transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
            <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          Iniciar novo projeto
        </Link>
        {projetos.length === 0 && !loading && (
          <p className="body-sm text-text-tertiary mt-3">
            Leva cerca de 10 minutos para parametrizar o contexto e começar a análise.
          </p>
        )}
      </section>
    </div>
  )
}
