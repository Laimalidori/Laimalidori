'use client'

import { useState } from 'react'
import type { EtapaDefinicao } from '@/types/wfp'

interface Props {
  def: EtapaDefinicao
}

export function EtapaFrameworks({ def }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border border-border-light rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-3.5 bg-bg-surface hover:bg-bg-subtle transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="label-sm text-text-secondary">Frameworks · Inputs · Outputs</span>
          <span className="text-xs text-text-tertiary">{def.frameworks.length} frameworks</span>
        </div>
        <svg
          className={`w-4 h-4 text-text-tertiary transition-transform ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 16 16"
          fill="none"
        >
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {open && (
        <div className="px-5 py-4 bg-bg-surface border-t border-border-light grid md:grid-cols-3 gap-5">
          <div className="space-y-2">
            <p className="label-sm text-text-tertiary">Frameworks</p>
            <ul className="space-y-1">
              {def.frameworks.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-text-secondary">
                  <span className="text-accent mt-0.5 shrink-0">→</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-2">
            <p className="label-sm text-text-tertiary">Inputs necessários</p>
            <ul className="space-y-1">
              {def.inputs.map((inp, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-text-secondary">
                  <span className="text-text-disabled mt-0.5 shrink-0">·</span>
                  {inp}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-2">
            <p className="label-sm text-text-tertiary">Outputs desta etapa</p>
            <ul className="space-y-1">
              {def.outputs.map((out, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-text-secondary">
                  <span className="text-success mt-0.5 shrink-0">✓</span>
                  {out}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
