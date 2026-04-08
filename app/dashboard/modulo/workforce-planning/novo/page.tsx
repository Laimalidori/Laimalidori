'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const BLOCOS = [
  { id: 1, titulo: 'Identidade da empresa',      subtitulo: 'Quem é a empresa' },
  { id: 2, titulo: 'Momento estratégico',         subtitulo: 'Em que fase está' },
  { id: 3, titulo: 'Contexto financeiro',         subtitulo: 'Budget e pressões' },
  { id: 4, titulo: 'Maturidade organizacional',   subtitulo: 'Dados e liderança' },
  { id: 5, titulo: 'Contexto político',           subtitulo: 'Dinâmica do poder — não pular' },
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
  const [error, setError] = useState('')

  // Bloco 1
  const [nomeEmpresa, setNomeEmpresa] = useState('')
  const [setor, setSetor] = useState('')
  const [mercado, setMercado] = useState('')
  const [numColaboradores, setNumColaboradores] = useState('')
  const [localizacao, setLocalizacao] = useState('')

  // Bloco 2
  const [momento, setMomento] = useState('')
  const [metaProximoAno, setMetaProximoAno] = useState('')
  const [gatilhoWFP, setGatilhoWFP] = useState('')

  // Bloco 3
  const [custoPessoasReceita, setCustoPessoasReceita] = useState('')
  const [pressaoBudget, setPressaoBudget] = useState('')
  const [liderBudget, setLiderBudget] = useState('')

  // Bloco 4
  const [maturidadeDados, setMaturidadeDados] = useState('')
  const [maturidadeLideranca, setMaturidadeLideranca] = useState('')
  const [historicoWFP, setHistoricoWFP] = useState('')

  // Bloco 5
  const [reacaoCEO, setReacaoCEO] = useState('')
  const [maiorRiscoPolitico, setMaiorRiscoPolitico] = useState('')
  const [liderPoderTravar, setLiderPoderTravar] = useState('')
  const [liderPoderTravarQuem, setLiderPoderTravarQuem] = useState('')

  function canAdvance() {
    if (bloco === 1) return nomeEmpresa && setor && mercado && numColaboradores && localizacao
    if (bloco === 2) return momento && metaProximoAno && gatilhoWFP
    if (bloco === 3) return custoPessoasReceita && pressaoBudget && liderBudget
    if (bloco === 4) return maturidadeDados && maturidadeLideranca && historicoWFP
    if (bloco === 5) return reacaoCEO && maiorRiscoPolitico && liderPoderTravar
    return false
  }

  async function handleSalvar() {
    setSaving(true)
    setError('')
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push('/login'); return }

    const parametrizacao = {
      identidadeEmpresa: { nomeEmpresa, setor, mercado, numColaboradores, localizacao },
      momentoEstrategico: { momento, metaProximoAno, gatilhoWFP },
      contextoFinanceiro: { custoPessoasReceita, pressaoBudget, liderBudget },
      maturidadeOrganizacional: { maturidadeDados, maturidadeLideranca, historicoWFP },
      contextoPolitico: {
        reacaoCEO, maiorRiscoPolitico, liderPoderTravar,
        ...(liderPoderTravar === 'sim' && liderPoderTravarQuem ? { liderPoderTravarQuem } : {}),
      },
    }

    const { data, error: dbError } = await supabase
      .from('wfp_projects')
      .insert({
        user_id: user.id,
        nome: `WFP — ${nomeEmpresa}`,
        status: 'ativo',
        parametrizacao,
        etapas_status: ETAPAS_INIT,
      })
      .select()
      .single()

    if (!dbError && data) {
      router.push(`/dashboard/modulo/workforce-planning/${data.id}`)
    } else {
      setError('Erro ao criar projeto. Tente novamente.')
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
          5 blocos · ~10 minutos · Alimenta toda a análise da Nina
        </p>
      </div>

      {/* Stepper */}
      <div className="flex gap-2">
        {BLOCOS.map((b) => (
          <div
            key={b.id}
            className={`flex-1 h-1.5 rounded-full transition-colors ${
              b.id <= bloco ? 'bg-accent' : 'bg-bg-muted'
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

      {/* ── Bloco 1 — Identidade da empresa ────────────── */}
      {bloco === 1 && (
        <div className="space-y-5">
          <Field label="Nome da empresa" required>
            <input
              className="form-input"
              value={nomeEmpresa}
              onChange={(e) => setNomeEmpresa(e.target.value)}
              placeholder="Ex: Acme Corp"
            />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Setor" required>
              <select className="form-input" value={setor} onChange={(e) => setSetor(e.target.value)}>
                <option value="">Selecione…</option>
                <option value="tech">Tech</option>
                <option value="fintech">Fintech</option>
                <option value="varejo">Varejo</option>
                <option value="saude">Saúde</option>
                <option value="industria">Indústria</option>
                <option value="servicos">Serviços</option>
                <option value="educacao">Educação</option>
                <option value="outro">Outro</option>
              </select>
            </Field>
            <Field label="Mercado" required>
              <select className="form-input" value={mercado} onChange={(e) => setMercado(e.target.value)}>
                <option value="">Selecione…</option>
                <option value="b2b">B2B</option>
                <option value="b2c">B2C</option>
                <option value="b2b2c">B2B2C</option>
                <option value="governo">Governo</option>
                <option value="misto">Misto</option>
              </select>
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Número de colaboradores" required>
              <select className="form-input" value={numColaboradores} onChange={(e) => setNumColaboradores(e.target.value)}>
                <option value="">Selecione…</option>
                <option value="50_100">50–100</option>
                <option value="101_200">101–200</option>
                <option value="201_400">201–400</option>
                <option value="401_800">401–800</option>
              </select>
            </Field>
            <Field label="Localização principal" required>
              <select className="form-input" value={localizacao} onChange={(e) => setLocalizacao(e.target.value)}>
                <option value="">Selecione…</option>
                <option value="sp">São Paulo</option>
                <option value="rj">Rio de Janeiro</option>
                <option value="nacional">Nacional (multi-estado)</option>
                <option value="internacional">Internacional</option>
              </select>
            </Field>
          </div>
        </div>
      )}

      {/* ── Bloco 2 — Momento estratégico ──────────────── */}
      {bloco === 2 && (
        <div className="space-y-5">
          <Field label="Momento atual da empresa" required>
            <select className="form-input" value={momento} onChange={(e) => setMomento(e.target.value)}>
              <option value="">Selecione o mais próximo…</option>
              <option value="hypergrowth">Hypergrowth — crescimento acima de 50% a.a.</option>
              <option value="crescimento_saudavel">Crescimento saudável — expansão controlada</option>
              <option value="eficiencia_margem">Eficiência e margem — otimizar, não crescer</option>
              <option value="transformacao">Transformação — mudança de modelo de negócio</option>
              <option value="reestruturacao">Reestruturação — revisão estrutural significativa</option>
              <option value="turnaround">Turnaround — recuperação de crise</option>
              <option value="ma">M&A — fusão, aquisição ou desinvestimento</option>
            </select>
          </Field>
          <Field
            label="Principal meta do próximo ano"
            hint="Uma frase. O que a empresa precisa entregar em 12 meses?"
            required
          >
            <textarea
              className="form-input min-h-[80px]"
              value={metaProximoAno}
              onChange={(e) => setMetaProximoAno(e.target.value)}
              placeholder="Ex: Dobrar a receita de R$50M para R$100M mantendo margem de 15%"
            />
          </Field>
          <Field
            label="O que desencadeou essa necessidade de WFP agora?"
            hint="O gatilho que fez o tema chegar à sua mesa"
            required
          >
            <textarea
              className="form-input min-h-[80px]"
              value={gatilhoWFP}
              onChange={(e) => setGatilhoWFP(e.target.value)}
              placeholder="Ex: O CFO pediu uma revisão do custo de pessoas antes do planejamento de 2025"
            />
          </Field>
        </div>
      )}

      {/* ── Bloco 3 — Contexto financeiro ──────────────── */}
      {bloco === 3 && (
        <div className="space-y-5">
          <div className="bg-bg-subtle border border-border-light rounded-lg p-4">
            <p className="body-sm text-text-secondary">
              Esses dados alimentam o diagnóstico financeiro da Etapa 1. Se não souber com precisão, escolha a opção mais próxima.
            </p>
          </div>
          <Field label="Custo total de pessoas sobre receita" required>
            <select className="form-input" value={custoPessoasReceita} onChange={(e) => setCustoPessoasReceita(e.target.value)}>
              <option value="">Selecione…</option>
              <option value="abaixo_30">Abaixo de 30%</option>
              <option value="30_45">30–45%</option>
              <option value="45_60">45–60%</option>
              <option value="acima_60">Acima de 60%</option>
              <option value="nao_sei">Não sei / não tenho esse dado</option>
            </select>
          </Field>
          <Field label="Pressão atual de budget" required>
            <select className="form-input" value={pressaoBudget} onChange={(e) => setPressaoBudget(e.target.value)}>
              <option value="">Selecione…</option>
              <option value="alta_cortes">Alta — cortes são necessários</option>
              <option value="moderada_otimizacao">Moderada — precisamos otimizar</option>
              <option value="baixa_crescimento">Baixa — temos espaço para crescer</option>
              <option value="sem_pressao">Sem pressão definida no momento</option>
            </select>
          </Field>
          <Field label="Quem lidera a discussão de budget de pessoas?" required>
            <select className="form-input" value={liderBudget} onChange={(e) => setLiderBudget(e.target.value)}>
              <option value="">Selecione…</option>
              <option value="ceo">CEO</option>
              <option value="cfo">CFO</option>
              <option value="coo">COO</option>
              <option value="chro">CHRO / VP de RH</option>
              <option value="comite">Comitê executivo</option>
              <option value="nao_definido">Não está claro / não definido</option>
            </select>
          </Field>
        </div>
      )}

      {/* ── Bloco 4 — Maturidade organizacional ────────── */}
      {bloco === 4 && (
        <div className="space-y-5">
          <Field label="Maturidade dos dados de pessoas" required>
            <select className="form-input" value={maturidadeDados} onChange={(e) => setMaturidadeDados(e.target.value)}>
              <option value="">Selecione…</option>
              <option value="baixa_planilhas">Baixa — planilhas dispersas, sem centralização</option>
              <option value="media_hris">Média — HRIS ativo, mas sem analytics estruturado</option>
              <option value="alta_analytics">Alta — analytics estruturado, dashboards ativos</option>
            </select>
          </Field>
          <Field label="Maturidade da liderança para decisões difíceis" required>
            <select className="form-input" value={maturidadeLideranca} onChange={(e) => setMaturidadeLideranca(e.target.value)}>
              <option value="">Selecione…</option>
              <option value="baixa_feeling">Baixa — decisões predominantemente por feeling</option>
              <option value="media_estrutura">Média — alguma estrutura, mas inconsistente</option>
              <option value="alta_data_driven">Alta — data-driven, conversas difíceis acontecem</option>
            </select>
          </Field>
          <Field label="Histórico de workforce planning na empresa" required>
            <select className="form-input" value={historicoWFP} onChange={(e) => setHistoricoWFP(e.target.value)}>
              <option value="">Selecione…</option>
              <option value="nunca">Nunca fizemos de forma estruturada</option>
              <option value="tentamos">Tentamos, mas não funcionou / ficou no papel</option>
              <option value="basico">Fazemos de forma básica (headcount por área)</option>
              <option value="bem">Fazemos bem, mas queremos ir mais fundo</option>
            </select>
          </Field>
        </div>
      )}

      {/* ── Bloco 5 — Contexto político ─────────────────── */}
      {bloco === 5 && (
        <div className="space-y-5">
          <div className="bg-warning-bg border border-warning-border rounded-lg p-4">
            <p className="body-sm text-warning font-medium mb-1">Bloco crítico — não pular</p>
            <p className="text-xs text-warning opacity-80">
              Esses dados filtram as recomendações técnicas pela realidade política da empresa.
              Ignorar isso é o erro que mais faz projetos virarem relatório de gaveta.
            </p>
          </div>
          <Field label="Como o CEO/board reage a propostas de RH?" required>
            <select className="form-input" value={reacaoCEO} onChange={(e) => setReacaoCEO(e.target.value)}>
              <option value="">Selecione…</option>
              <option value="cetico">Cético — precisa de muito dado para se convencer</option>
              <option value="aberto">Aberto — mas exige clareza e objetividade</option>
              <option value="parceiro">Parceiro — co-constrói as soluções com o RH</option>
              <option value="nao_se_envolve">Não se envolve — delega completamente</option>
            </select>
          </Field>
          <Field
            label="Qual é o maior risco político desse projeto?"
            hint="Uma frase honesta. Ninguém vai ler além de você."
            required
          >
            <textarea
              className="form-input min-h-[80px]"
              value={maiorRiscoPolitico}
              onChange={(e) => setMaiorRiscoPolitico(e.target.value)}
              placeholder="Ex: O VP de Operações vai perceber que o projeto pode reduzir o time dele e vai resistir"
            />
          </Field>
          <Field label="Tem líder de área que pode travar o projeto?" required>
            <select className="form-input" value={liderPoderTravar} onChange={(e) => setLiderPoderTravar(e.target.value)}>
              <option value="">Selecione…</option>
              <option value="sim">Sim</option>
              <option value="nao">Não</option>
              <option value="nao_sei">Não sei ainda</option>
            </select>
          </Field>
          {liderPoderTravar === 'sim' && (
            <Field label="Quem? (cargo ou área)" hint="Não precisa ser o nome — cargo ou área basta">
              <input
                className="form-input"
                value={liderPoderTravarQuem}
                onChange={(e) => setLiderPoderTravarQuem(e.target.value)}
                placeholder="Ex: VP de Engenharia, Diretor Comercial"
              />
            </Field>
          )}
        </div>
      )}

      {error && (
        <p className="text-xs text-danger">{error}</p>
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
            onClick={() => setBloco((b) => b + 1)}
            disabled={!canAdvance()}
            className="bg-accent text-white px-5 py-2.5 rounded body-sm font-medium hover:bg-accent-hover transition-colors disabled:opacity-40 disabled:pointer-events-none"
          >
            Próximo →
          </button>
        ) : (
          <button
            onClick={handleSalvar}
            disabled={saving || !canAdvance()}
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
  label, hint, required, children,
}: {
  label: string; hint?: string; required?: boolean; children: React.ReactNode
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
