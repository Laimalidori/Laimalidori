'use client'

import Link from 'next/link'
import { ETAPAS_WFP } from '@/types/wfp'
import type { WFPProject } from '@/types/wfp'

interface Props {
  projeto:   WFPProject | null
  stageNum:  number
  projectId: string
}

export function SintesePanel({ projeto, stageNum, projectId }: Props) {
  const etapas = projeto?.etapas_status ?? []

  return (
    <div>
      <p className="label-sm text-text-tertiary mb-4">Síntese do projeto</p>
      <div className="relative">
        {/* Vertical connecting line */}
        <div className="absolute left-[11px] top-3 bottom-3 w-px bg-border-light" />

        <div className="space-y-0">
          {ETAPAS_WFP.map((def) => {
            const etapaStatus = etapas.find((e) => e.etapaId === def.id)
            const status      = etapaStatus?.status ?? 'bloqueada'
            const isCurrent   = def.id === stageNum
            const isCompleted = status === 'concluida'
            const isLocked    = status === 'bloqueada'
            const clickable   = isCompleted || isCurrent

            return (
              <div key={def.id} className="relative flex gap-3 pb-5">
                {/* Circle */}
                <div
                  className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center shrink-0 border-2 transition-colors ${
                    isCompleted
                      ? 'bg-success border-success'
                      : isCurrent
                      ? 'border-accent bg-bg-surface'
                      : 'border-border-light bg-bg-subtle'
                  }`}
                >
                  {isCompleted && (
                    <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l2.5 2.5L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                  {isCurrent && <div className="w-2 h-2 rounded-full bg-accent" />}
                </div>

                {/* Label + resumo */}
                <div className="flex-1 min-w-0 pt-0.5">
                  {clickable ? (
                    <Link
                      href={`/dashboard/modulo/workforce-planning/${projectId}/etapa/${def.id}`}
                      className={`text-xs font-medium transition-colors ${
                        isCurrent
                          ? 'text-text-primary'
                          : 'text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      {def.nome}
                    </Link>
                  ) : (
                    <span className="text-xs text-text-disabled">{def.nome}</span>
                  )}

                  {isCompleted && etapaStatus?.resumo && (
                    <p className="text-xs text-text-tertiary mt-1 line-clamp-2 leading-relaxed">
                      {etapaStatus.resumo}
                    </p>
                  )}
                  {isCompleted && !etapaStatus?.resumo && (
                    <p className="text-xs text-text-disabled mt-0.5 italic">Concluída</p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
