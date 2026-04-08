/* ─────────────────────────────────────────────────────────
   Módulo 01 — Workforce Planning
   Tipos TypeScript completos
───────────────────────────────────────────────────────── */

/* ── Enums ─────────────────────────────────────────────── */

export type SetorEmpresa =
  | 'tecnologia'
  | 'financeiro'
  | 'saude'
  | 'varejo'
  | 'industria'
  | 'servicos'
  | 'educacao'
  | 'energia'
  | 'agronegocio'
  | 'outro'

export type FaturamentoFaixa =
  | 'ate_50m'
  | '50m_200m'
  | '200m_1b'
  | '1b_5b'
  | 'acima_5b'

export type EstagioCrescimento =
  | 'startup'
  | 'crescimento'
  | 'maturidade'
  | 'transformacao'
  | 'consolidacao'

export type HorizontePlanejamento =
  | '12_meses'
  | '18_meses'
  | '24_meses'
  | '36_meses'
  | '5_anos'

export type NivelMaturidadeWFP =
  | 'inicial'         // Sem processo formal
  | 'em_construcao'   // Primeiros passos
  | 'definido'        // Processos básicos
  | 'gerenciado'      // Dados e métricas
  | 'otimizado'       // Preditivo e integrado

export type TipoProjetoWFP =
  | 'diagnostico_inicial'
  | 'planejamento_anual'
  | 'reestruturacao'
  | 'crescimento_acelerado'
  | 'reducao_headcount'
  | 'transformacao_digital'
  | 'fusao_aquisicao'

export type StatusProjeto = 'parametrizando' | 'ativo' | 'pausado' | 'concluido'

export type StatusEtapa = 'bloqueada' | 'disponivel' | 'em_andamento' | 'concluida'

/* ── Parametrização ─────────────────────────────────────── */

export interface PerfilNegocio {
  nomeEmpresa: string
  setor: SetorEmpresa
  faturamentoFaixa: FaturamentoFaixa
  numFuncionarios: number
  estagio: EstagioCrescimento
  anosOperacao?: number
  presencaGeografica?: string  // ex: "Nacional — 5 estados"
}

export interface ContextoEstrategico {
  horizonte: HorizontePlanejamento
  drivers: string[]           // ex: ["expansão geográfica", "automação"]
  metasCrescimento?: string   // descrição livre
  restricoesOrçamento?: string
  mandatoRH?: string          // ex: "Reduzir custo com pessoal em 15%"
}

export interface DadosForcaTrabalho {
  turnoverAnual: number           // percentual
  distribuicaoNiveis: {           // % por nível
    executivo: number
    gestao: number
    especialista: number
    operacional: number
  }
  riscoAutomacao: 'baixo' | 'medio' | 'alto'
  areasCriticas: string[]         // ex: ["Engenharia", "Comercial"]
  gapHabilidades?: string         // descrição livre
  sourcingDificuldade?: 'baixa' | 'media' | 'alta'
}

export interface MaturidadeRecursos {
  nivelMaturidade: NivelMaturidadeWFP
  ferramentasAtivas: string[]     // ex: ["Excel", "SAP SuccessFactors"]
  restricoesRecursos?: string
  stakeholdersChave?: string      // ex: "CFO, CEO, CTO"
  tempoDisponivel?: string        // ex: "6 semanas para diagnóstico"
}

export interface FocoProjeto {
  tipo: TipoProjetoWFP
  areasEscopo: string[]           // ex: ["TI", "Operações", "Vendas"]
  outputsEsperados: string[]      // ex: ["Relatório de gaps", "Plano de ação 12m"]
  prioridade: 'custo' | 'capacidade' | 'competencias' | 'estrutura'
  benchmarkDesejado?: boolean
}

export interface ParametrizacaoWFP {
  perfilNegocio: PerfilNegocio
  contextoEstrategico: ContextoEstrategico
  dadosForcaTrabalho: DadosForcaTrabalho
  maturidadeRecursos: MaturidadeRecursos
  focoProjeto: FocoProjeto
}

/* ── Projeto ────────────────────────────────────────────── */

export interface WFPProject {
  id: string
  userId: string
  nome: string
  status: StatusProjeto
  parametrizacao: ParametrizacaoWFP
  etapas: WFPEtapaStatus[]
  criadoEm: string
  atualizadoEm: string
}

/* ── Etapas ─────────────────────────────────────────────── */

export type EtapaId = 1 | 2 | 3 | 4 | 5 | 6

export interface EtapaDefinicao {
  id: EtapaId
  numero: string
  nome: string
  descricao: string
  objetivo: string
  frameworks: string[]
  inputs: string[]
  outputs: string[]
  tempoEstimado: string
}

export interface WFPEtapaStatus {
  etapaId: EtapaId
  status: StatusEtapa
  iniciadoEm?: string
  concluidoEm?: string
  resumo?: string             // síntese gerada pela Nina
  arquivosGerados?: string[]
}

export interface WFPEtapaOutput {
  id: string
  projetoId: string
  etapaId: EtapaId
  conteudo: Record<string, unknown>   // structured JSON per stage
  mensagens: EtapaMensagem[]
  criadoEm: string
  atualizadoEm: string
}

export interface EtapaMensagem {
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

/* ── Definições das 6 etapas ────────────────────────────── */

export const ETAPAS_WFP: EtapaDefinicao[] = [
  {
    id: 1,
    numero: '01',
    nome: 'Diagnóstico da Força de Trabalho',
    descricao: 'Mapeamento completo da força de trabalho atual: composição, competências, custos e dinâmicas.',
    objetivo: 'Estabelecer a fotografia atual da força de trabalho como baseline para todas as análises subsequentes.',
    frameworks: ['Pirâmide de headcount', 'Matriz de competências críticas', 'Análise de custo por função'],
    inputs: ['Dados de headcount por área', 'Estrutura salarial', 'Perfis de cargo', 'Indicadores de turnover'],
    outputs: ['Relatório de diagnóstico', 'Mapa de competências', 'Análise de custo-pessoa'],
    tempoEstimado: '1–2 semanas',
  },
  {
    id: 2,
    numero: '02',
    nome: 'Projeção de Demanda',
    descricao: 'Modelagem da força de trabalho necessária para entregar a estratégia do negócio no horizonte definido.',
    objetivo: 'Traduzir os objetivos estratégicos em demanda de pessoas: quantidade, perfil e localização.',
    frameworks: ['Ratio-based modeling', 'Regression-based forecasting', 'Scenario planning'],
    inputs: ['Plano estratégico', 'Metas de crescimento', 'Drivers de negócio', 'Benchmarks do setor'],
    outputs: ['Modelo de projeção', 'Cenários (base, otimista, conservador)', 'Gap quantitativo inicial'],
    tempoEstimado: '1–2 semanas',
  },
  {
    id: 3,
    numero: '03',
    nome: 'Análise de Lacunas',
    descricao: 'Comparação entre a força de trabalho atual e a necessária, identificando gaps quantitativos e qualitativos.',
    objetivo: 'Priorizar gaps críticos que demandam intervenção imediata versus os que podem ser tratados no médio prazo.',
    frameworks: ['Gap analysis matrix', 'Criticality scoring', 'Time-to-fill modeling'],
    inputs: ['Diagnóstico (Etapa 1)', 'Projeção de demanda (Etapa 2)', 'Dados de mercado de talento'],
    outputs: ['Mapa de gaps priorizados', 'Heatmap de risco por área', 'Gaps críticos vs. desejáveis'],
    tempoEstimado: '1 semana',
  },
  {
    id: 4,
    numero: '04',
    nome: 'Estratégias de WFP',
    descricao: 'Desenvolvimento das alavancas estratégicas para endereçar os gaps identificados: build, buy, borrow, bot.',
    objetivo: 'Definir o mix estratégico de soluções para cada gap, considerando custo, velocidade e viabilidade.',
    frameworks: ['Build-Buy-Borrow-Bot framework', 'Talent strategy matrix', 'Cost-benefit analysis'],
    inputs: ['Análise de gaps (Etapa 3)', 'Capacidade orçamentária', 'Benchmarks de mercado', 'Maturidade interna'],
    outputs: ['Estratégia por gap', 'Business case por iniciativa', 'Roadmap de implementação'],
    tempoEstimado: '1–2 semanas',
  },
  {
    id: 5,
    numero: '05',
    nome: 'Plano de Ação',
    descricao: 'Tradução das estratégias em iniciativas concretas com responsáveis, prazos, orçamento e KPIs.',
    objetivo: 'Criar um plano executável que a liderança possa aprovar, monitorar e cobrar resultados.',
    frameworks: ['OKR framework', 'Initiative roadmap', 'RACI matrix', 'Change management plan'],
    inputs: ['Estratégias definidas (Etapa 4)', 'Capacidade de execução', 'Prioridades do negócio'],
    outputs: ['Plano de ação detalhado', 'Budget consolidado', 'Cronograma master', 'Matriz RACI'],
    tempoEstimado: '1 semana',
  },
  {
    id: 6,
    numero: '06',
    nome: 'Governança & Monitoramento',
    descricao: 'Estrutura de acompanhamento e atualização contínua do plano de workforce planning.',
    objetivo: 'Garantir que o WFP não seja um exercício pontual, mas um processo vivo integrado ao ciclo de gestão.',
    frameworks: ['People metrics dashboard', 'Review cadence design', 'Early warning indicators'],
    inputs: ['Plano de ação (Etapa 5)', 'Estrutura de governança existente', 'Ferramentas disponíveis'],
    outputs: ['Dashboard de KPIs', 'Cadência de revisão', 'Relatório de governança', 'Modelo de atualização'],
    tempoEstimado: '1 semana',
  },
]
