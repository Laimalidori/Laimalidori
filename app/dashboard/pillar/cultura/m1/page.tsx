import M1Motor from '@/components/m1/M1Motor'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

export default function M1Page() {
  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2">
        <Link
          href="/dashboard/pillar/cultura"
          className="flex items-center gap-1.5 text-xs text-text-tertiary hover:text-text-primary transition-colors"
        >
          <ChevronLeft size={13} strokeWidth={1.5} />
          Cultura & Experiência
        </Link>
        <span className="text-text-disabled text-xs">/</span>
        <span className="text-xs text-text-secondary">Motor M1 — Análise Estratégica</span>
      </div>

      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] text-text-disabled tracking-widest uppercase">M1</span>
          <span className="h-3 w-px bg-border-light" />
          <span className="text-xs text-text-tertiary">Fase 1 de N — Leitura Objetiva</span>
        </div>
        <h1 className="text-2xl font-semibold text-text-primary tracking-tight">Análise Estratégica</h1>
        <p className="text-sm text-text-tertiary max-w-xl">
          Interpreta o Assessment Estratégico e o Briefing CEO para produzir o Bloco 1 — base objetiva para a definição de cultura.
        </p>
      </div>

      {/* Motor */}
      <M1Motor />
    </div>
  )
}
