'use client'

import { useState } from 'react'

const NAVY = '#1B2A4A'
const CORAL = '#E8366E'
const TEAL = '#0D9388'

// ── Types ─────────────────────────────────────────────────────────────────────

interface Metrica {
  margem_bruta?: string
  cac?: string
  ltv?: string
  nrr?: string
  ciclo_vendas?: string
}

interface Ofensor {
  ofensor: string
  causa_raiz: string
  impacto_estrategico: string
}

interface Section11 {
  titulo?: string
  missao_declarada?: string
  visao_declarada?: string
  o_que_exige_objetivamente?: string
  gap_com_realidade?: string
  portanto_cultura_precisa?: string
}

interface Section12 {
  titulo?: string
  onde_compete?: string
  disputa_no_setor?: string
  metricas_chave?: Metrica
  perfil_cliente_que_gera_valor?: string
  portanto_cultura_precisa?: string
}

interface Section13 {
  titulo?: string
  diferencial_declarado?: string
  diferencial_observado?: string
  trade_offs_identificados?: string
  principal_causa_perda_negocio?: string
  onde_aposta_e_solida?: string
  onde_aposta_e_fragil?: string
  portanto_cultura_precisa?: string
}

interface Section14 {
  titulo?: string
  classificacao?: string
  justificativa?: string
  modo_competitivo_dominante?: string
  tipo_inovacao_viavel?: string
  calibracao_d4?: string
  confianca_na_classificacao?: string
  portanto_cultura_precisa?: string
}

interface Section15 {
  titulo?: string
  estagio_identificado?: string
  sinais_de_identificacao?: string
  desafios_culturais_previsiveis?: string
  portanto_cultura_precisa?: string
}

interface Section16 {
  titulo?: string
  o_que_consegue_fazer_hoje?: string
  ofensores_criticos?: Ofensor[]
  o_que_cultura_precisa_compensar?: string
  portanto_cultura_precisa?: string
}

interface Section17 {
  titulo?: string
  comprometimentos_declarados?: string
  prioridade_real_vs_declarada?: string
  o_que_exige_nos_proximos_12_meses?: string
  portanto_cultura_precisa?: string
}

interface DesafioCritico {
  desafio: string
  causa_raiz: string
}

interface SinteseEstrategica {
  posicao_competitiva_real?: string
  aposta_estrategica?: string
  economia_do_modelo_negocio?: string
  desafios_criticos_execucao?: DesafioCritico[]
  o_que_estrategia_exige_da_organizacao?: string
  arquetipo_e_implicacoes_culturais?: string
}

interface RedFlag {
  flag: string
  evidencia: string
  implicacao_para_processo: string
}

interface Hipotese {
  hipotese: string
  pergunta_de_teste: string
  sinal_confirmacao: string
  sinal_refutacao: string
}

interface M1Result {
  empresa?: string
  data_analise?: string
  bloco1?: {
    '1_1'?: Section11
    '1_2'?: Section12
    '1_3'?: Section13
    '1_4'?: Section14
    '1_5'?: Section15
    '1_6'?: Section16
    '1_7'?: Section17
  }
  sintese_estrategica?: SinteseEstrategica
  red_flags?: RedFlag[]
  dados_ausentes?: string[]
  hipoteses_para_validar?: Hipotese[]
  nota_da_consultora?: string
}

// ── Sub-components ────────────────────────────────────────────────────────────

function Tag({ children, color = NAVY }: { children: React.ReactNode; color?: string }) {
  return (
    <span style={{
      display: 'inline-block', padding: '2px 10px', borderRadius: 20,
      background: color + '18', color, fontSize: 11, fontWeight: 700,
      textTransform: 'uppercase', letterSpacing: 0.8,
    }}>
      {children}
    </span>
  )
}

function Field({ label, value }: { label: string; value?: string }) {
  if (!value || value === '...') return null
  return (
    <div style={{ marginBottom: 12 }}>
      <span style={{ fontSize: 10, fontWeight: 700, color: '#8899AA', textTransform: 'uppercase', letterSpacing: 0.8 }}>
        {label}
      </span>
      <p style={{ margin: '4px 0 0', fontSize: 13, color: '#2D3748', lineHeight: 1.65 }}>{value}</p>
    </div>
  )
}

function Portanto({ text }: { text?: string }) {
  if (!text || text === '...') return null
  return (
    <div style={{
      marginTop: 16, padding: '12px 16px',
      background: '#FFF0F4', borderLeft: `3px solid ${CORAL}`, borderRadius: '0 6px 6px 0',
    }}>
      <span style={{ fontSize: 10, fontWeight: 700, color: CORAL, textTransform: 'uppercase', letterSpacing: 0.8 }}>
        Portanto, a cultura precisa...
      </span>
      <p style={{ margin: '6px 0 0', fontSize: 13, color: '#333', lineHeight: 1.65 }}>{text}</p>
    </div>
  )
}

function Accordion({ title, accent = NAVY, defaultOpen = true, children }: {
  title: string; accent?: string; defaultOpen?: boolean; children: React.ReactNode
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div style={{
      background: '#fff', borderRadius: 10, overflow: 'hidden',
      border: '1px solid #E8EDF4', marginBottom: 8,
      borderLeft: `3px solid ${accent}`,
    }}>
      <button
        onClick={() => setOpen(p => !p)}
        style={{
          width: '100%', padding: '14px 18px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
        }}
      >
        <span style={{ fontWeight: 600, color: NAVY, fontSize: 13 }}>{title}</span>
        <span style={{ color: '#bbb', fontSize: 16, transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'none' }}>▾</span>
      </button>
      {open && <div style={{ padding: '0 18px 18px' }}>{children}</div>}
    </div>
  )
}

// ── Section renderers ─────────────────────────────────────────────────────────

function S11({ s }: { s: Section11 }) {
  return (
    <>
      <Field label="Missão declarada" value={s.missao_declarada} />
      <Field label="Visão declarada" value={s.visao_declarada} />
      <Field label="O que exige objetivamente" value={s.o_que_exige_objetivamente} />
      <Field label="Gap com a realidade" value={s.gap_com_realidade} />
      <Portanto text={s.portanto_cultura_precisa} />
    </>
  )
}

function S12({ s }: { s: Section12 }) {
  const m = s.metricas_chave ?? {}
  const metricLabels: Record<string, string> = {
    margem_bruta: 'Margem Bruta', cac: 'CAC', ltv: 'LTV', nrr: 'NRR', ciclo_vendas: 'Ciclo de Vendas',
  }
  return (
    <>
      <Field label="Onde compete" value={s.onde_compete} />
      <Field label="Disputa no setor" value={s.disputa_no_setor} />
      {Object.keys(m).length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 8, marginBottom: 12 }}>
          {(Object.entries(m) as [string, string][]).map(([k, v]) => (
            <div key={k} style={{ background: '#F4F7FB', borderRadius: 8, padding: '10px 12px' }}>
              <span style={{ fontSize: 10, fontWeight: 600, color: '#8899AA', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                {metricLabels[k] ?? k}
              </span>
              <p style={{ margin: '4px 0 0', fontSize: 13, fontWeight: 700, color: NAVY }}>{v}</p>
            </div>
          ))}
        </div>
      )}
      <Field label="Perfil do cliente que gera valor" value={s.perfil_cliente_que_gera_valor} />
      <Portanto text={s.portanto_cultura_precisa} />
    </>
  )
}

function S13({ s }: { s: Section13 }) {
  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
        <div style={{ background: '#F0FBF9', borderRadius: 8, padding: 14 }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: TEAL, textTransform: 'uppercase', letterSpacing: 0.8 }}>Diferencial declarado</span>
          <p style={{ margin: '6px 0 0', fontSize: 13, color: '#2D3748', lineHeight: 1.6 }}>{s.diferencial_declarado}</p>
        </div>
        <div style={{ background: '#F4F7FB', borderRadius: 8, padding: 14 }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: NAVY, textTransform: 'uppercase', letterSpacing: 0.8 }}>Diferencial observado</span>
          <p style={{ margin: '6px 0 0', fontSize: 13, color: '#2D3748', lineHeight: 1.6 }}>{s.diferencial_observado}</p>
        </div>
      </div>
      <Field label="Trade-offs identificados" value={s.trade_offs_identificados} />
      <Field label="Principal causa de perda de negócio" value={s.principal_causa_perda_negocio} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
        <div>
          <span style={{ fontSize: 10, fontWeight: 700, color: TEAL, textTransform: 'uppercase', letterSpacing: 0.8 }}>Onde a aposta é sólida</span>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: '#333', lineHeight: 1.6 }}>{s.onde_aposta_e_solida}</p>
        </div>
        <div>
          <span style={{ fontSize: 10, fontWeight: 700, color: CORAL, textTransform: 'uppercase', letterSpacing: 0.8 }}>Onde a aposta é frágil</span>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: '#333', lineHeight: 1.6 }}>{s.onde_aposta_e_fragil}</p>
        </div>
      </div>
      <Portanto text={s.portanto_cultura_precisa} />
    </>
  )
}

function S14({ s }: { s: Section14 }) {
  return (
    <>
      <Field label="Justificativa da classificação" value={s.justificativa} />
      <Field label="Modo competitivo dominante" value={s.modo_competitivo_dominante} />
      <div style={{ padding: '12px 16px', background: '#F4F7FB', borderRadius: 8, marginBottom: 12 }}>
        <span style={{ fontSize: 10, fontWeight: 700, color: '#8899AA', textTransform: 'uppercase', letterSpacing: 0.8 }}>
          Calibração D4 → Inovação
        </span>
        <p style={{ margin: '6px 0 0', fontSize: 13, color: '#333', lineHeight: 1.6 }}>{s.calibracao_d4}</p>
      </div>
      <Portanto text={s.portanto_cultura_precisa} />
    </>
  )
}

function S15({ s }: { s: Section15 }) {
  return (
    <>
      <Field label="Sinais de identificação" value={s.sinais_de_identificacao} />
      <Field label="Desafios culturais previsíveis para este estágio" value={s.desafios_culturais_previsiveis} />
      <Portanto text={s.portanto_cultura_precisa} />
    </>
  )
}

function S16({ s }: { s: Section16 }) {
  return (
    <>
      <Field label="O que consegue fazer hoje" value={s.o_que_consegue_fazer_hoje} />
      {(s.ofensores_criticos ?? []).length > 0 && (
        <div style={{ marginBottom: 12 }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: '#8899AA', textTransform: 'uppercase', letterSpacing: 0.8 }}>
            Ofensores Críticos (máx. 3)
          </span>
          {(s.ofensores_criticos ?? []).map((o, i) => (
            <div key={i} style={{
              marginTop: 10, padding: '12px 14px',
              background: '#FFFAF0', borderLeft: '3px solid #F59E0B', borderRadius: '0 6px 6px 0',
            }}>
              <p style={{ margin: 0, fontWeight: 600, color: '#92400E', fontSize: 13 }}>{o.ofensor}</p>
              <p style={{ margin: '4px 0', fontSize: 12, color: '#555' }}><strong>Causa-raiz:</strong> {o.causa_raiz}</p>
              <p style={{ margin: 0, fontSize: 12, color: '#555' }}><strong>Impacto estratégico:</strong> {o.impacto_estrategico}</p>
            </div>
          ))}
        </div>
      )}
      <Field label="O que a cultura precisa compensar" value={s.o_que_cultura_precisa_compensar} />
      <Portanto text={s.portanto_cultura_precisa} />
    </>
  )
}

function S17({ s }: { s: Section17 }) {
  return (
    <>
      <Field label="Comprometimentos declarados" value={s.comprometimentos_declarados} />
      <Field label="Prioridade real vs. declarada" value={s.prioridade_real_vs_declarada} />
      <Field label="O que exige nos próximos 12 meses" value={s.o_que_exige_nos_proximos_12_meses} />
      <Portanto text={s.portanto_cultura_precisa} />
    </>
  )
}

const BLOCO1_CONFIG = [
  { key: '1_1' as const, label: '1.1 — Missão e Visão vs. Realidade', Component: S11 },
  { key: '1_2' as const, label: '1.2 — Where to Play',                Component: S12 },
  { key: '1_3' as const, label: '1.3 — How to Win',                   Component: S13 },
  { key: '1_4' as const, label: '1.4 — Arquétipo Estratégico',        Component: S14 },
  { key: '1_5' as const, label: '1.5 — Ciclo de Vida',                Component: S15 },
  { key: '1_6' as const, label: '1.6 — Capacidade de Execução',       Component: S16 },
  { key: '1_7' as const, label: '1.7 — OKRs do Ano',                  Component: S17 },
]

// ── ResultView ────────────────────────────────────────────────────────────────

function ResultView({ result, onReset }: { result: M1Result; onReset: () => void }) {
  const b14 = result.bloco1?.['1_4'] ?? {}

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <h2 style={{ margin: 0, color: NAVY, fontSize: 18, fontWeight: 700 }}>Bloco 1 — Leitura Objetiva</h2>
          <p style={{ margin: '3px 0 0', color: '#778899', fontSize: 12 }}>
            {result.empresa} · {result.data_analise}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={() => navigator.clipboard.writeText(JSON.stringify(result, null, 2))}
            style={{ padding: '8px 14px', background: TEAL, color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 12, fontWeight: 600 }}
          >
            Copiar JSON
          </button>
          <button
            onClick={onReset}
            style={{ padding: '8px 14px', background: '#fff', color: NAVY, border: `1.5px solid ${NAVY}`, borderRadius: 6, cursor: 'pointer', fontSize: 12, fontWeight: 600 }}
          >
            Nova análise
          </button>
        </div>
      </div>

      {/* Arquétipo hero */}
      <div style={{
        background: NAVY, borderRadius: 12, padding: '20px 24px',
        display: 'flex', gap: 32, alignItems: 'flex-start', marginBottom: 16, flexWrap: 'wrap',
      }}>
        <div>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>Arquétipo</span>
          <p style={{ margin: '4px 0 0', color: '#fff', fontSize: 20, fontWeight: 800 }}>{b14.classificacao ?? '—'}</p>
        </div>
        <div style={{ borderLeft: '1px solid rgba(255,255,255,0.15)', paddingLeft: 32 }}>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>Inovação Viável</span>
          <p style={{ margin: '4px 0 0', color: CORAL, fontSize: 16, fontWeight: 700 }}>{b14.tipo_inovacao_viavel ?? '—'}</p>
        </div>
        <div style={{ borderLeft: '1px solid rgba(255,255,255,0.15)', paddingLeft: 32 }}>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>Confiança</span>
          <p style={{ margin: '4px 0 0', color: '#fff', fontSize: 16, fontWeight: 700 }}>{b14.confianca_na_classificacao ?? '—'}</p>
        </div>
        {b14.calibracao_d4 && (
          <div style={{ borderLeft: '1px solid rgba(255,255,255,0.15)', paddingLeft: 32, flex: 1 }}>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>Calibração D4</span>
            <p style={{ margin: '4px 0 0', color: 'rgba(255,255,255,0.8)', fontSize: 12, lineHeight: 1.6 }}>{b14.calibracao_d4}</p>
          </div>
        )}
      </div>

      {/* Bloco 1 sections */}
      {BLOCO1_CONFIG.map(({ key, label, Component }) => {
        const section = result.bloco1?.[key]
        if (!section) return null
        return (
          <Accordion key={key} title={label} accent={TEAL}>
            {/* @ts-expect-error union type — each key maps to its section type */}
            <Component s={section} />
          </Accordion>
        )
      })}

      {/* Síntese estratégica */}
      {result.sintese_estrategica && (
        <Accordion title="Síntese Estratégica — 6 Outputs McKinsey/BCG" accent={NAVY}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {([
              ['Posição Competitiva Real',          result.sintese_estrategica.posicao_competitiva_real],
              ['Aposta Estratégica',                result.sintese_estrategica.aposta_estrategica],
              ['Economia do Modelo',                result.sintese_estrategica.economia_do_modelo_negocio],
              ['O que a Estratégia Exige',          result.sintese_estrategica.o_que_estrategia_exige_da_organizacao],
              ['Arquétipo e Implicações Culturais', result.sintese_estrategica.arquetipo_e_implicacoes_culturais],
            ] as [string, string | undefined][]).map(([title, val], i) => (
              <div key={i} style={{ background: '#F4F7FB', borderRadius: 8, padding: '14px 16px' }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: TEAL, textTransform: 'uppercase', letterSpacing: 0.8 }}>{title}</span>
                <p style={{ margin: '6px 0 0', fontSize: 13, color: '#2D3748', lineHeight: 1.65 }}>{val}</p>
              </div>
            ))}
            {(result.sintese_estrategica.desafios_criticos_execucao ?? []).length > 0 && (
              <div style={{ background: '#F4F7FB', borderRadius: 8, padding: '14px 16px' }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: TEAL, textTransform: 'uppercase', letterSpacing: 0.8 }}>
                  Desafios Críticos de Execução
                </span>
                {(result.sintese_estrategica.desafios_criticos_execucao ?? []).map((d, i) => (
                  <div key={i} style={{ marginTop: 10 }}>
                    <p style={{ margin: 0, fontWeight: 600, fontSize: 13, color: '#333' }}>{d.desafio}</p>
                    <p style={{ margin: '2px 0 0', fontSize: 12, color: '#666' }}>{d.causa_raiz}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Accordion>
      )}

      {/* Red Flags */}
      {(result.red_flags ?? []).length > 0 && (
        <Accordion title={`Red Flags — ${result.red_flags!.length} identificados`} accent={CORAL}>
          {result.red_flags!.map((f, i) => (
            <div key={i} style={{
              marginBottom: 10, padding: '12px 16px',
              background: '#FFF5F7', borderLeft: `3px solid ${CORAL}`, borderRadius: '0 8px 8px 0',
            }}>
              <p style={{ margin: 0, fontWeight: 700, color: CORAL, fontSize: 13 }}>{f.flag}</p>
              <p style={{ margin: '4px 0', fontSize: 12, color: '#555' }}><strong>Evidência:</strong> {f.evidencia}</p>
              <p style={{ margin: 0, fontSize: 12, color: '#555' }}><strong>Implicação para o processo:</strong> {f.implicacao_para_processo}</p>
            </div>
          ))}
        </Accordion>
      )}

      {/* Hipóteses */}
      {(result.hipoteses_para_validar ?? []).length > 0 && (
        <Accordion title="Hipóteses para Validar com o CEO" accent={NAVY}>
          {result.hipoteses_para_validar!.map((h, i) => (
            <div key={i} style={{ marginBottom: 14, background: '#F4F7FB', borderRadius: 8, padding: '14px 16px' }}>
              <p style={{ margin: '0 0 10px', fontWeight: 600, color: NAVY, fontSize: 13 }}>H{i + 1}: {h.hipotese}</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
                <div>
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#8899AA', textTransform: 'uppercase', letterSpacing: 0.8 }}>Pergunta de teste</span>
                  <p style={{ margin: '4px 0 0', fontSize: 12, color: '#333', lineHeight: 1.6 }}>{h.pergunta_de_teste}</p>
                </div>
                <div>
                  <span style={{ fontSize: 10, fontWeight: 700, color: TEAL, textTransform: 'uppercase', letterSpacing: 0.8 }}>Sinal de confirmação</span>
                  <p style={{ margin: '4px 0 0', fontSize: 12, color: '#333', lineHeight: 1.6 }}>{h.sinal_confirmacao}</p>
                </div>
                <div>
                  <span style={{ fontSize: 10, fontWeight: 700, color: CORAL, textTransform: 'uppercase', letterSpacing: 0.8 }}>Sinal de refutação</span>
                  <p style={{ margin: '4px 0 0', fontSize: 12, color: '#333', lineHeight: 1.6 }}>{h.sinal_refutacao}</p>
                </div>
              </div>
            </div>
          ))}
        </Accordion>
      )}

      {/* Dados ausentes + nota */}
      {((result.dados_ausentes ?? []).length > 0 || result.nota_da_consultora) && (
        <Accordion title="Dados Ausentes e Nota de Qualidade" accent="#94A3B8" defaultOpen={false}>
          {(result.dados_ausentes ?? []).length > 0 && (
            <>
              <span style={{ fontSize: 10, fontWeight: 700, color: '#8899AA', textTransform: 'uppercase', letterSpacing: 0.8 }}>Dados ausentes</span>
              <ul style={{ margin: '8px 0 16px', paddingLeft: 18 }}>
                {result.dados_ausentes!.map((d, i) => (
                  <li key={i} style={{ fontSize: 13, color: '#555', marginBottom: 4 }}>{d}</li>
                ))}
              </ul>
            </>
          )}
          {result.nota_da_consultora && (
            <>
              <span style={{ fontSize: 10, fontWeight: 700, color: '#8899AA', textTransform: 'uppercase', letterSpacing: 0.8 }}>Nota da consultora</span>
              <p style={{ margin: '6px 0 0', fontSize: 13, color: '#444', lineHeight: 1.65 }}>{result.nota_da_consultora}</p>
            </>
          )}
        </Accordion>
      )}
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function M1Motor() {
  const [activeTab, setActiveTab] = useState<'motor' | 'prompt'>('motor')
  const [assessment, setAssessment] = useState('')
  const [briefing, setBriefing] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadMsg, setLoadMsg] = useState('')
  const [result, setResult] = useState<M1Result | null>(null)
  const [error, setError] = useState('')

  const LOAD_MESSAGES = [
    'Lendo Assessment Estratégico...',
    'Interpretando dados do CFO...',
    'Derivando arquétipo e tipo de inovação viável...',
    'Construindo Bloco 1 — Leitura Objetiva...',
  ]

  const generateAnalysis = async () => {
    if (!assessment.trim() || !briefing.trim()) {
      setError('Preencha os dois campos antes de gerar.')
      return
    }
    setError('')
    setLoading(true)
    setResult(null)

    let msgIdx = 0
    setLoadMsg(LOAD_MESSAGES[0])
    const interval = setInterval(() => {
      msgIdx = (msgIdx + 1) % LOAD_MESSAGES.length
      setLoadMsg(LOAD_MESSAGES[msgIdx])
    }, 2500)

    try {
      const res = await fetch('/api/m1', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assessment, briefing }),
      })
      if (!res.ok) throw new Error(await res.text())
      const parsed: M1Result = await res.json()
      setResult(parsed)
    } catch (err) {
      setError('Erro ao processar. Verifique os dados e tente novamente.')
      console.error(err)
    } finally {
      clearInterval(interval)
      setLoading(false)
    }
  }

  const SYSTEM_PROMPT_PREVIEW = `Você é um analista estratégico sênior especialista em diagnóstico organizacional...
(System prompt completo injetado via API — ver /app/api/m1/route.ts)`

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: '#F0F4FA', minHeight: '100%', borderRadius: 12, overflow: 'hidden' }}>
      {/* Tab bar */}
      <div style={{
        background: NAVY, padding: '12px 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderRadius: '12px 12px 0 0',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ color: CORAL, fontSize: 11, fontWeight: 700, letterSpacing: 0.5 }}>Motor M1</span>
          <div style={{ width: 1, height: 14, background: 'rgba(255,255,255,0.15)' }} />
          <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: 11 }}>Análise Estratégica</span>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {(['motor', 'prompt'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              padding: '5px 12px', borderRadius: 6, border: 'none', cursor: 'pointer',
              fontSize: 11, fontWeight: 600,
              background: activeTab === tab ? CORAL : 'rgba(255,255,255,0.08)',
              color: '#fff',
            }}>
              {tab === 'motor' ? 'Motor M1' : 'Ver Prompt'}
            </button>
          ))}
        </div>
      </div>

      {/* Prompt viewer */}
      {activeTab === 'prompt' && (
        <div style={{ padding: 20 }}>
          <div style={{ background: '#fff', borderRadius: 10, padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <div>
                <h3 style={{ margin: 0, color: NAVY, fontSize: 14, fontWeight: 700 }}>System Prompt — M1</h3>
                <p style={{ margin: '3px 0 0', color: '#778899', fontSize: 11 }}>
                  Injetado como system message via <code>/api/m1</code>
                </p>
              </div>
            </div>
            <pre style={{
              background: '#F4F7FB', padding: 16, borderRadius: 8,
              fontSize: 11, lineHeight: 1.7, whiteSpace: 'pre-wrap',
              overflow: 'auto', maxHeight: 400, color: '#2D3748', margin: 0,
            }}>
              {SYSTEM_PROMPT_PREVIEW}
            </pre>
          </div>
        </div>
      )}

      {/* Motor */}
      {activeTab === 'motor' && (
        <div style={{ padding: 20 }}>
          {!result ? (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                {/* Assessment */}
                <div style={{ background: '#fff', borderRadius: 10, padding: 18 }}>
                  <p style={{ margin: '0 0 4px', fontWeight: 700, color: NAVY, fontSize: 13 }}>Assessment Estratégico</p>
                  <p style={{ margin: '0 0 10px', fontSize: 11, color: '#778899' }}>Seções 1–4 · Desk research + CFO</p>
                  <textarea
                    value={assessment}
                    onChange={e => setAssessment(e.target.value)}
                    placeholder="Cole aqui o Assessment Estratégico preenchido..."
                    style={{
                      width: '100%', height: 320, border: '1.5px solid #E2E8F0',
                      borderRadius: 8, padding: 12, fontSize: 12, lineHeight: 1.7,
                      resize: 'vertical', boxSizing: 'border-box', color: '#2D3748',
                      fontFamily: 'inherit', outline: 'none',
                    }}
                  />
                </div>
                {/* Briefing CEO */}
                <div style={{ background: '#fff', borderRadius: 10, padding: 18 }}>
                  <p style={{ margin: '0 0 4px', fontWeight: 700, color: NAVY, fontSize: 13 }}>Ficha Síntese — Briefing CEO</p>
                  <p style={{ margin: '0 0 10px', fontSize: 11, color: '#778899' }}>11 dimensões com evidências · Preencher até 2h após a conversa</p>
                  <textarea
                    value={briefing}
                    onChange={e => setBriefing(e.target.value)}
                    placeholder="Cole aqui a Ficha Síntese preenchida após o briefing com o CEO..."
                    style={{
                      width: '100%', height: 320, border: '1.5px solid #E2E8F0',
                      borderRadius: 8, padding: 12, fontSize: 12, lineHeight: 1.7,
                      resize: 'vertical', boxSizing: 'border-box', color: '#2D3748',
                      fontFamily: 'inherit', outline: 'none',
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, marginTop: 18 }}>
                {error && <p style={{ margin: 0, color: CORAL, fontSize: 13, fontWeight: 500 }}>{error}</p>}
                {loading ? (
                  <div style={{ textAlign: 'center' }}>
                    <div style={{
                      width: 40, height: 40, border: `3px solid ${NAVY}20`,
                      borderTop: `3px solid ${NAVY}`, borderRadius: '50%',
                      margin: '0 auto 10px',
                      animation: 'spin 0.9s linear infinite',
                    }} />
                    <p style={{ margin: 0, color: NAVY, fontSize: 13, fontWeight: 500 }}>{loadMsg}</p>
                    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                  </div>
                ) : (
                  <button
                    onClick={generateAnalysis}
                    style={{
                      padding: '13px 36px', background: NAVY, color: '#fff',
                      border: 'none', borderRadius: 8, cursor: 'pointer',
                      fontSize: 14, fontWeight: 700, letterSpacing: -0.3,
                      boxShadow: '0 4px 14px rgba(27,42,74,0.25)',
                    }}
                  >
                    Gerar Análise Estratégica M1
                  </button>
                )}
              </div>
            </>
          ) : (
            <ResultView result={result} onReset={() => setResult(null)} />
          )}
        </div>
      )}
    </div>
  )
}
