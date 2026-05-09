'use client'

import Link from 'next/link'
import { ChevronRight, Lock } from 'lucide-react'

// Each phase in the culture definition process
const PHASES = [
  {
    num: 'M1',
    title: 'Análise Estratégica',
    subtitle: 'Bloco 1 — Leitura Objetiva',
    description: 'Interpreta o Assessment Estratégico e o Briefing CEO para derivar arquétipo, ciclo de vida e ofensores críticos de execução.',
    outputs: ['Arquétipo estratégico', 'Tipo de inovação viável', 'Red flags com evidência', 'Hipóteses para o CEO'],
    href: '/dashboard/pillar/cultura/m1',
    status: 'available' as const,
  },
  {
    num: 'M2',
    title: 'Diagnóstico Cultural',
    subtitle: 'Bloco 2 — Leitura Qualitativa',
    description: 'Interpreta entrevistas, pesquisas e artefatos culturais para mapear a cultura praticada vs. declarada.',
    outputs: ['Mapa de cultura praticada', 'Gap cultural crítico', 'Forças e vetores de mudança'],
    href: '#',
    status: 'soon' as const,
  },
  {
    num: 'M3',
    title: 'Definição de Cultura',
    subtitle: 'Bloco 3 — Síntese e Design',
    description: 'Consolida os blocos anteriores em princípios, comportamentos e rituais que a organização precisa cultivar.',
    outputs: ['Princípios culturais', 'Comportamentos observáveis', 'Plano de ativação'],
    href: '#',
    status: 'soon' as const,
  },
  {
    num: 'M4',
    title: 'Plano de Implementação',
    subtitle: 'Bloco 4 — Execução',
    description: 'Traduz a cultura definida em iniciativas, métricas e rituais de acompanhamento.',
    outputs: ['Roadmap cultural', 'KPIs de cultura', 'Rituais de reforço'],
    href: '#',
    status: 'soon' as const,
  },
]

function PhaseCard({ phase, index }: { phase: typeof PHASES[number]; index: number }) {
  const available = phase.status === 'available'

  const inner = (
    <div className={`
      group relative flex flex-col gap-4 p-5 rounded-xl border transition-all
      ${available
        ? 'bg-bg-surface border-border-light hover:border-border-medium hover:shadow-card cursor-pointer'
        : 'bg-bg-subtle border-border-light opacity-60 cursor-default'
      }
    `}>
      {/* Phase number + status */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2.5">
          <span className={`
            font-mono text-[11px] font-bold tracking-widest px-2 py-0.5 rounded
            ${available ? 'bg-pink/10 text-pink' : 'bg-bg-muted text-text-disabled'}
          `}>
            {phase.num}
          </span>
          <span className="text-[10px] font-medium text-text-disabled uppercase tracking-widest">
            Fase {index + 1}
          </span>
        </div>
        {available ? (
          <ChevronRight
            size={14}
            strokeWidth={1.5}
            className="text-text-disabled group-hover:text-pink group-hover:translate-x-0.5 transition-all"
          />
        ) : (
          <Lock size={12} strokeWidth={1.5} className="text-text-disabled" />
        )}
      </div>

      {/* Title + subtitle */}
      <div className="space-y-0.5">
        <h3 className="text-[15px] font-semibold text-text-primary leading-snug">{phase.title}</h3>
        <p className="text-[11px] text-text-disabled font-mono">{phase.subtitle}</p>
      </div>

      {/* Description */}
      <p className="text-[13px] text-text-secondary leading-relaxed">{phase.description}</p>

      {/* Outputs */}
      <div className="space-y-1.5">
        <span className="text-[10px] font-semibold text-text-disabled uppercase tracking-widest">Outputs</span>
        <div className="flex flex-wrap gap-1.5">
          {phase.outputs.map(o => (
            <span
              key={o}
              className={`
                text-[11px] px-2 py-0.5 rounded-full border
                ${available
                  ? 'bg-accent-light border-accent-border text-text-secondary'
                  : 'bg-bg-muted border-border-light text-text-disabled'
                }
              `}
            >
              {o}
            </span>
          ))}
        </div>
      </div>

      {/* CTA */}
      {available && (
        <div className="mt-auto pt-2 border-t border-border-light">
          <span className="text-[12px] font-semibold text-pink group-hover:text-pink/80 transition-colors">
            Abrir motor →
          </span>
        </div>
      )}
    </div>
  )

  if (available) {
    return <Link href={phase.href}>{inner}</Link>
  }
  return inner
}

export default function CulturaPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-1">
        <span className="font-mono text-[10px] text-text-disabled tracking-widest uppercase">05</span>
        <h1 className="text-2xl font-semibold text-text-primary tracking-tight">Cultura & Experiência</h1>
        <p className="text-sm text-text-tertiary max-w-xl">
          Processo estruturado de diagnóstico, definição e implementação de cultura organizacional.
        </p>
      </div>

      {/* Architecture diagram */}
      <div className="rounded-xl overflow-hidden border border-border-light" style={{ background: '#0C1024' }}>
        <iframe
          src="/cultura-diagram.html"
          className="w-full"
          style={{ height: '40vw', maxHeight: 520, minHeight: 320, border: 'none', display: 'block' }}
          title="Diagnóstico Cultural — Arquitetura de Fluxo"
        />
      </div>

      {/* Phase pipeline */}
      <div className="space-y-3">
        <div className="flex items-center gap-4">
          <p className="text-[11px] font-semibold text-text-disabled uppercase tracking-widest shrink-0">
            Fases do processo
          </p>
          <div className="flex-1 h-px bg-border-light" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {PHASES.map((phase, i) => (
            <PhaseCard key={phase.num} phase={phase} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
