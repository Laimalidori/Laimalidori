'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useEmpresaStore } from '@/store/empresa'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { SectionLabel } from '@/components/ui/SectionLabel'
import type { EmpresaContext } from '@/types/empresa'

const MOMENTO_OPTIONS = [
  { value: 'Hypergrowth', label: 'Hypergrowth' },
  { value: 'Eficiência', label: 'Eficiência' },
  { value: 'Transformação', label: 'Transformação' },
  { value: 'Turnaround', label: 'Turnaround' },
  { value: 'M&A', label: 'M&A / Fusão' },
  { value: 'Steady State', label: 'Steady State' },
]

const MATURIDADE_OPTIONS = [
  { value: 'Baixa', label: 'Baixa' },
  { value: 'Média', label: 'Média' },
  { value: 'Alta', label: 'Alta' },
]

const BUDGET_OPTIONS = [
  { value: 'Restrito', label: 'Restrito' },
  { value: 'Moderado', label: 'Moderado' },
  { value: 'Alto', label: 'Alto' },
]

const MERCADO_OPTIONS = [
  { value: 'B2B', label: 'B2B' },
  { value: 'B2C', label: 'B2C' },
  { value: 'B2B2C', label: 'B2B2C' },
  { value: 'Governo', label: 'Governo' },
]

const PORTE_OPTIONS = [
  { value: 'Até 50', label: 'Até 50 pessoas' },
  { value: '51-150', label: '51 a 150 pessoas' },
  { value: '151-500', label: '151 a 500 pessoas' },
  { value: '501-2000', label: '501 a 2.000 pessoas' },
  { value: '2001-10000', label: '2.001 a 10.000 pessoas' },
  { value: '+10000', label: 'Acima de 10.000' },
]

interface EmpresaFormProps {
  initial?: EmpresaContext
}

export function EmpresaForm({ initial }: EmpresaFormProps) {
  const router = useRouter()
  const { setEmpresa } = useEmpresaStore()
  const [saving, setSaving] = useState(false)

  const [form, setForm] = useState<EmpresaContext>(
    initial ?? {
      nome: '',
      setor: '',
      mercado: '',
      porte: '',
      receita_faixa: '',
      momento: '',
      cultura_descricao: '',
      cultura_desafios: '',
      maturidade_rh: '',
      maturidade_lider: '',
      budget_rh: '',
      desafios_top: '',
      meta_ano: '',
      contexto_extra: '',
    }
  )

  function update(field: keyof EmpresaContext, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSave() {
    setSaving(true)
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const payload = { ...form, user_id: user.id, updated_at: new Date().toISOString() }

      if (initial?.id) {
        await supabase.from('empresa_context').update(payload).eq('id', initial.id)
      } else {
        await supabase.from('empresa_context').upsert(payload, { onConflict: 'user_id' })
      }

      setEmpresa(payload)
      router.push('/dashboard')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-10 max-w-2xl">
      <section className="space-y-4">
        <SectionLabel>Identidade</SectionLabel>
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Nome da empresa"
            id="nome"
            value={form.nome ?? ''}
            onChange={(e) => update('nome', e.target.value)}
            placeholder="Acme Corp"
          />
          <Input
            label="Setor"
            id="setor"
            value={form.setor ?? ''}
            onChange={(e) => update('setor', e.target.value)}
            placeholder="Tecnologia, Saúde, Varejo..."
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Mercado"
            id="mercado"
            options={MERCADO_OPTIONS}
            value={form.mercado ?? ''}
            onChange={(e) => update('mercado', e.target.value)}
            placeholder="Selecione..."
          />
          <Select
            label="Porte"
            id="porte"
            options={PORTE_OPTIONS}
            value={form.porte ?? ''}
            onChange={(e) => update('porte', e.target.value)}
            placeholder="Selecione..."
          />
        </div>
        <Input
          label="Faixa de receita anual"
          id="receita"
          value={form.receita_faixa ?? ''}
          onChange={(e) => update('receita_faixa', e.target.value)}
          placeholder="ex: R$ 50M - R$ 200M"
        />
      </section>

      <section className="space-y-4">
        <SectionLabel>Momento estratégico</SectionLabel>
        <Select
          label="Momento atual"
          id="momento"
          options={MOMENTO_OPTIONS}
          value={form.momento ?? ''}
          onChange={(e) => update('momento', e.target.value)}
          placeholder="Selecione..."
        />
        <Input
          label="Principal meta do ano"
          id="meta"
          value={form.meta_ano ?? ''}
          onChange={(e) => update('meta_ano', e.target.value)}
          placeholder="ex: Reduzir turnover de 35% para 18%"
        />
        <Textarea
          label="Top 3 desafios atuais"
          id="desafios"
          value={form.desafios_top ?? ''}
          onChange={(e) => update('desafios_top', e.target.value)}
          placeholder="Descreva os principais desafios..."
          rows={4}
        />
      </section>

      <section className="space-y-4">
        <SectionLabel>Cultura & Liderança</SectionLabel>
        <Textarea
          label="Como você descreveria a cultura atual"
          id="cultura"
          value={form.cultura_descricao ?? ''}
          onChange={(e) => update('cultura_descricao', e.target.value)}
          placeholder="Alta performance, inovação, colaboração..."
          rows={3}
        />
        <Textarea
          label="Principais tensões ou desafios culturais"
          id="tensoes"
          value={form.cultura_desafios ?? ''}
          onChange={(e) => update('cultura_desafios', e.target.value)}
          placeholder="ex: Conflito entre velocidade e qualidade..."
          rows={3}
        />
        <Select
          label="Maturidade da liderança"
          id="lid"
          options={MATURIDADE_OPTIONS}
          value={form.maturidade_lider ?? ''}
          onChange={(e) => update('maturidade_lider', e.target.value)}
          placeholder="Selecione..."
        />
      </section>

      <section className="space-y-4">
        <SectionLabel>RH</SectionLabel>
        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Maturidade dos processos de RH"
            id="mat_rh"
            options={MATURIDADE_OPTIONS}
            value={form.maturidade_rh ?? ''}
            onChange={(e) => update('maturidade_rh', e.target.value)}
            placeholder="Selecione..."
          />
          <Select
            label="Budget de RH"
            id="budget"
            options={BUDGET_OPTIONS}
            value={form.budget_rh ?? ''}
            onChange={(e) => update('budget_rh', e.target.value)}
            placeholder="Selecione..."
          />
        </div>
        <Textarea
          label="Contexto adicional"
          id="extra"
          value={form.contexto_extra ?? ''}
          onChange={(e) => update('contexto_extra', e.target.value)}
          placeholder="Qualquer informação relevante que a Nina deva saber..."
          rows={3}
        />
      </section>

      <div className="flex justify-end gap-3 pt-4 border-t border-[var(--border)]">
        <Button variant="secondary" onClick={() => router.back()}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSave} loading={saving}>
          Salvar contexto
        </Button>
      </div>
    </div>
  )
}
