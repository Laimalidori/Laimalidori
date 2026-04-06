'use client'

import Link from 'next/link'
import { useEmpresaStore } from '@/store/empresa'
import { cn } from '@/lib/utils'

export function CompanyStrip() {
  const { empresa } = useEmpresaStore()

  if (!empresa?.nome) {
    return (
      <Link
        href="/dashboard/empresa"
        className="hidden md:flex items-center justify-center h-9 border-b border-[var(--border)] bg-gold-subtle/40 hover:bg-gold-subtle transition-colors"
      >
        <span className="label text-gold">+ Configurar contexto da empresa</span>
      </Link>
    )
  }

  const fields = [
    { label: 'EMPRESA', value: empresa.nome },
    { label: 'SETOR', value: empresa.setor },
    { label: 'PORTE', value: empresa.porte },
    { label: 'MOMENTO', value: empresa.momento },
    { label: 'MATURIDADE RH', value: empresa.maturidade_rh },
  ].filter((f) => f.value)

  return (
    <Link
      href="/dashboard/empresa"
      className={cn(
        'hidden md:flex items-center gap-8 px-8 h-9 border-b border-[var(--border)] bg-surface-subtle/60',
        'hover:bg-surface-subtle transition-colors group'
      )}
    >
      {fields.map((f) => (
        <div key={f.label} className="flex items-baseline gap-2">
          <span className="label text-text-disabled">{f.label}</span>
          <span className="body-sm text-text-secondary">{f.value}</span>
        </div>
      ))}
      <span className="ml-auto label text-text-disabled opacity-0 group-hover:opacity-100 transition-opacity">
        Editar →
      </span>
    </Link>
  )
}
