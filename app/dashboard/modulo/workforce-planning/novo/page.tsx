'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { ParametrizacaoWFP } from '@/types/wfp'

const BLOCOS = [
  { id: 1, titulo: 'Perfil do Negócio',          subtitulo: 'Contexto da empresa' },
  { id: 2, titulo: 'Contexto Estratégico',        subtitulo: 'Horizonte e drivers' },
  { id: 3, titulo: 'Força de Trabalho',           subtitulo: 'Dados atuais' },
  { id: 4, titulo: 'Maturidade & Recursos',       subtitulo: 'Capacidade de execução' },
  { id: 5, titulo: 'Foco do Projeto',             subtitulo: 'Escopo e outputs' },
]

const ETAPAS_INIT = [
  { etapaId: 1, status: 'disponivel' },
  { etapaId: 2, status: 'bloqueada' },
  { etapaId: 3, status: 'bloqueada' },
  { etapaId: 4, status: 'bloqueada' },
  { etapaId: 5, status: 'bloqueada' },
  { etapaId: 6, status: 'bloqueada' },
]

export default function NovoProjetoPage() {
  const router = useRouter()
  const [bloco, setBloco] = useState(1)
  const [saving, setSaving] = useState(false)

  // Form state
  const [nomeEmpresa, setNomeEmpresa] = useState('')
  const [setor, setSetor] = useState('')
  const [faturamento, setFaturamento] = useState('')
  const [numFuncionarios, setNumFuncionarios] = useState('')
  const [estagio, setEstagio] = useState('')

  const [horizonte, setHorizonte] = useState('')
  const [drivers, setDrivers] = useState('')
  const [mandatoRH, setMandatoRH] = useState('')

  const [turnover, setTurnover] = useState('')
  const [riscoAutomacao, setRiscoAutomacao] = useState('')
  const [areasCriticas, setAreasCriticas] = useState('')
  const [gapHabilidades, setGapHabilidades] = useState('')

  const [nivelMaturidade, setNivelMaturidade] = useState('')
  const [ferramentas, setFerramentas] = useState('')
  const [stakeholders, setStakeholders] = useState('')
  const [restricoes, setRestricoesR] = useState('')

  const [tipoProjeto, setTipoProjeto] = useState('')
  const [areasEscopo, setAreasEscopo] = useState('')
  const [outputs, setOutputs] = useState('')
  const [prioridade, setPrioridade] = useState('')

  async function handleSalvar() {
    setSaving(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push('/login'); return }

    const parametrizacao: ParametrizacaoWFP = {
      perfilNegocio: {
        nomeEmpresa,
        setor: setor as ParametrizacaoWFP['perfilNegocio']['setor'],
        faturamentoFaixa: faturamento as ParametrizacaoWFP['perfilNegocio']['faturamentoFaixa'],
        numFuncionarios: parseInt(numFuncionarios) || 0,
        estagio: estagio as ParametrizacaoWFP['perfilNegocio']['estagio'],
      },
      contextoEstrategico: {
        horizonte: horizonte as ParametrizacaoWFP['contextoEstrategico']['horizonte'],
        drivers: drivers.split(',').map((d) => d.trim()).filter(Boolean),
        mandatoRH: mandatoRH || undefined,
      },
      dadosForcaTrabalho: {
        turnoverAnual: parseFloat(turnover) || 0,
        distribuicaoNiveis: { executivo: 0, gestao: 0, especialista: 0, operacional: 0 },
        riscoAutomacao: (riscoAutomacao || 'medio') as 'baixo' | 'medio' | 'alto',
        areasCriticas: areasCriticas.split(',').map((a) => a.trim()).filter(Boolean),
        gapHabilidades: gapHabilidades || undefined,
      },
      maturidadeRecursos: {
        nivelMaturidade: nivelMaturidade as ParametrizacaoWFP['maturidadeRecursos']['nivelMaturidade'],
        ferramentasAtivas: ferramentas.split(',').map((f) => f.trim()).filter(Boolean),
        stakeholdersChave: stakeholders || undefined,
        restricoesRecursos: restricoes || undefined,
      },
      focoProjeto: {
        tipo: tipoProjeto as ParametrizacaoWFP['focoProjeto']['tipo'],
        areasEscopo: areasEscopo.split(',').map((a) => a.trim()).filter(Boolean),
        outputsEsperados: outputs.split(',').map((o) => o.trim()).filter(Boolean),
        prioridade: (prioridade || 'capacidade') as ParametrizacaoWFP['focoProjeto']['prioridade'],
      },
    }

    const { data, error } = await supabase
      .from('wfp_projects')
      .insert({
        user_id: user.id,
        nome: `WFP — ${nomeEmpresa || 'Novo Projeto'}`,
        status: 'ativo',
        parametrizacao,
        etapas_status: ETAPAS_INIT,
      })
      .select()
      .single()

    if (!error && data) {
      router.push(`/dashboard/modulo/workforce-planning/${data.id}`)
    } else {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <p className="label-sm text-text-tertiary mb-1">Novo projeto · Workforce Planning</p>
        <h1 className="display-lg text-text-primary">Parametrização de contexto</h1>
        <p className="body-sm text-text-secondary mt-1">
          5 blocos · ~10 minutos · Salvo automaticamente
        </p>
      </div>

      {/* Stepper */}
      <div className="flex gap-2">
        {BLOCOS.map((b) => (
          <button
            key={b.id}
            onClick={() => setBloco(b.id)}
            className={`flex-1 h-1.5 rounded-full transition-colors ${
              b.id < bloco ? 'bg-accent' : b.id === bloco ? 'bg-accent' : 'bg-bg-muted'
            }`}
          />
        ))}
      </div>
      <div className="flex items-center gap-2">
        <span className="mono-sm text-text-tertiary">Bloco {bloco} de 5</span>
        <span className="text-text-disabled">·</span>
        <span className="body-sm text-text-primary font-medium">{BLOCOS[bloco - 1].titulo}</span>
        <span className="text-text-disabled">·</span>
        <span className="body-sm text-text-tertiary">{BLOCOS[bloco - 1].subtitulo}</span>
      </div>

      {/* Bloco 1 — Perfil do Negócio */}
      {bloco === 1 && (
        <div className="space-y-5">
          <Field label="Nome da empresa" required>
            <input className="form-input" value={nomeEmpresa} onChange={(e) => setNomeEmpresa(e.target.value)} placeholder="Ex: Acme Corp" />
          </Field>
          <Field label="Setor de atuação" required>
            <select className="form-input" value={setor} onChange={(e) => setSetor(e.target.value)}>
              <option value="">Selecione…</option>
              <option value="tecnologia">Tecnologia</option>
              <option value="financeiro">Financeiro</option>
              <option value="saude">Saúde</option>
              <option value="varejo">Varejo</option>
              <option value="industria">Indústria</option>
              <option value="servicos">Serviços</option>
              <option value="educacao">Educação</option>
              <option value="energia">Energia</option>
              <option value="agronegocio">Agronegócio</option>
              <option value="outro">Outro</option>
            </select>
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Faixa de faturamento" required>
              <select className="form-input" value={faturamento} onChange={(e) => setFaturamento(e.target.value)}>
                <option value="">Selecione…</option>
                <option value="ate_50m">Até R$ 50 milhões</option>
                <option value="50m_200m">R$ 50–200 milhões</option>
                <option value="200m_1b">R$ 200 mi – 1 bilhão</option>
                <option value="1b_5b">R$ 1–5 bilhões</option>
                <option value="acima_5b">Acima de R$ 5 bilhões</option>
              </select>
            </Field>
            <Field label="Número de funcionários" required>
              <input className="form-input" type="number" value={numFuncionarios} onChange={(e) => setNumFuncionarios(e.target.value)} placeholder="Ex: 1500" />
            </Field>
          </div>
          <Field label="Estágio da empresa" required>
            <select className="form-input" value={estagio} onChange={(e) => setEstagio(e.target.value)}>
              <option value="">Selecione…</option>
              <option value="startup">Startup / early stage</option>
              <option value="crescimento">Crescimento acelerado</option>
              <option value="maturidade">Maturidade</option>
              <option value="transformacao">Transformação / turnaround</option>
              <option value="consolidacao">Consolidação / M&A</option>
            </select>
          </Field>
        </div>
      )}

      {/* Bloco 2 — Contexto Estratégico */}
      {bloco === 2 && (
        <div className="space-y-5">
          <Field label="Horizonte de planejamento" required>
            <select className="form-input" value={horizonte} onChange={(e) => setHorizonte(e.target.value)}>
              <option value="">Selecione…</option>
              <option value="12_meses">12 meses</option>
              <option value="18_meses">18 meses</option>
              <option value="24_meses">24 meses</option>
              <option value="36_meses">36 meses</option>
              <option value="5_anos">5 anos</option>
            </select>
          </Field>
          <Field label="Principais drivers do negócio" hint="Separe por vírgula" required>
            <input
              className="form-input"
              value={drivers}
              onChange={(e) => setDrivers(e.target.value)}
              placeholder="Ex: expansão geográfica, automação, crescimento de receita"
            />
          </Field>
          <Field label="Mandato do RH" hint="O que o CEO/board espera do RH neste momento?">
            <textarea
              className="form-input min-h-[80px]"
              value={mandatoRH}
              onChange={(e) => setMandatoRH(e.target.value)}
              placeholder="Ex: Reduzir custo com pessoal em 15% sem impactar entregas críticas"
            />
          </Field>
        </div>
      )}

      {/* Bloco 3 — Força de Trabalho */}
      {bloco === 3 && (
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Turnover anual (%)" required>
              <input className="form-input" type="number" step="0.1" value={turnover} onChange={(e) => setTurnover(e.target.value)} placeholder="Ex: 18" />
            </Field>
            <Field label="Risco de automação" required>
              <select className="form-input" value={riscoAutomacao} onChange={(e) => setRiscoAutomacao(e.target.value)}>
                <option value="">Selecione…</option>
                <option value="baixo">Baixo (&lt;20% dos cargos)</option>
                <option value="medio">Médio (20–50%)</option>
                <option value="alto">Alto (&gt;50%)</option>
              </select>
            </Field>
          </div>
          <Field label="Áreas críticas de talento" hint="Áreas com maior impacto no negócio ou dificuldade de sourcing" required>
            <input
              className="form-input"
              value={areasCriticas}
              onChange={(e) => setAreasCriticas(e.target.value)}
              placeholder="Ex: Engenharia, Comercial, Supply Chain"
            />
          </Field>
          <Field label="Principal gap de habilidades" hint="Em sua opinião, qual a maior lacuna de competências hoje?">
            <textarea
              className="form-input min-h-[80px]"
              value={gapHabilidades}
              onChange={(e) => setGapHabilidades(e.target.value)}
              placeholder="Ex: Faltam líderes técnicos sênior e especialistas em dados"
            />
          </Field>
        </div>
      )}

      {/* Bloco 4 — Maturidade & Recursos */}
      {bloco === 4 && (
        <div className="space-y-5">
          <Field label="Maturidade atual em WFP" required>
            <select className="form-input" value={nivelMaturidade} onChange={(e) => setNivelMaturidade(e.target.value)}>
              <option value="">Selecione…</option>
              <option value="inicial">Inicial — sem processo formal</option>
              <option value="em_construcao">Em construção — primeiros passos</option>
              <option value="definido">Definido — processos básicos em uso</option>
              <option value="gerenciado">Gerenciado — dados e métricas consistentes</option>
              <option value="otimizado">Otimizado — preditivo e integrado ao negócio</option>
            </select>
          </Field>
          <Field label="Ferramentas de RH disponíveis" hint="Separe por vírgula">
            <input
              className="form-input"
              value={ferramentas}
              onChange={(e) => setFerramentas(e.target.value)}
              placeholder="Ex: SAP SuccessFactors, Excel, Tableau"
            />
          </Field>
          <Field label="Stakeholders-chave" hint="Quem precisa aprovar ou será impactado?">
            <input
              className="form-input"
              value={stakeholders}
              onChange={(e) => setStakeholders(e.target.value)}
              placeholder="Ex: CFO, CEO, heads de área"
            />
          </Field>
          <Field label="Restrições de recursos" hint="Orçamento, tempo, equipe">
            <input
              className="form-input"
              value={restricoes}
              onChange={(e) => setRestricoesR(e.target.value)}
              placeholder="Ex: Equipe de RH pequena, sem budget extra"
            />
          </Field>
        </div>
      )}

      {/* Bloco 5 — Foco do Projeto */}
      {bloco === 5 && (
        <div className="space-y-5">
          <Field label="Tipo de projeto" required>
            <select className="form-input" value={tipoProjeto} onChange={(e) => setTipoProjeto(e.target.value)}>
              <option value="">Selecione…</option>
              <option value="diagnostico_inicial">Diagnóstico inicial</option>
              <option value="planejamento_anual">Planejamento anual</option>
              <option value="reestruturacao">Reestruturação organizacional</option>
              <option value="crescimento_acelerado">Suporte a crescimento acelerado</option>
              <option value="reducao_headcount">Redução de headcount</option>
              <option value="transformacao_digital">Transformação digital</option>
              <option value="fusao_aquisicao">Fusão & Aquisição</option>
            </select>
          </Field>
          <Field label="Áreas no escopo" hint="Separe por vírgula" required>
            <input
              className="form-input"
              value={areasEscopo}
              onChange={(e) => setAreasEscopo(e.target.value)}
              placeholder="Ex: TI, Operações, Vendas"
            />
          </Field>
          <Field label="Outputs esperados" hint="O que precisa ser entregue ao final?">
            <input
              className="form-input"
              value={outputs}
              onChange={(e) => setOutputs(e.target.value)}
              placeholder="Ex: Relatório de gaps, Plano de ação 12 meses, Apresentação para board"
            />
          </Field>
          <Field label="Prioridade central" required>
            <select className="form-input" value={prioridade} onChange={(e) => setPrioridade(e.target.value)}>
              <option value="">Selecione…</option>
              <option value="custo">Otimizar custo com pessoal</option>
              <option value="capacidade">Aumentar capacidade de entrega</option>
              <option value="competencias">Desenvolver competências críticas</option>
              <option value="estrutura">Redesenhar estrutura organizacional</option>
            </select>
          </Field>
        </div>
      )}

      {/* Navegação */}
      <div className="flex items-center justify-between pt-2 border-t border-border-light">
        <button
          onClick={() => setBloco((b) => Math.max(1, b - 1))}
          disabled={bloco === 1}
          className="body-sm text-text-secondary hover:text-text-primary transition-colors disabled:opacity-30 disabled:pointer-events-none"
        >
          ← Anterior
        </button>

        {bloco < 5 ? (
          <button
            onClick={() => setBloco((b) => Math.min(5, b + 1))}
            className="bg-accent text-white px-5 py-2.5 rounded body-sm font-medium hover:bg-accent-hover transition-colors"
          >
            Próximo →
          </button>
        ) : (
          <button
            onClick={handleSalvar}
            disabled={saving}
            className="bg-accent text-white px-5 py-2.5 rounded body-sm font-medium hover:bg-accent-hover transition-colors disabled:opacity-60"
          >
            {saving ? 'Criando projeto…' : 'Criar projeto →'}
          </button>
        )}
      </div>
    </div>
  )
}

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string
  hint?: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <label className="label-sm text-text-primary">
        {label}
        {required && <span className="text-danger ml-1">*</span>}
      </label>
      {hint && <p className="text-xs text-text-tertiary">{hint}</p>}
      {children}
    </div>
  )
}
