/* ─────────────────────────────────────────────────────────
   Módulo 01 — Workforce Planning
   Tipos TypeScript — alinhados à spec v1.0
───────────────────────────────────────────────────────── */

/* ── Bloco 1 — Identidade da empresa ───────────────────── */

export type SetorWFP =
  | 'tech' | 'fintech' | 'varejo' | 'saude'
  | 'industria' | 'servicos' | 'educacao' | 'outro'

export type MercadoWFP = 'b2b' | 'b2c' | 'b2b2c' | 'governo' | 'misto'

export type ColaboradoresFaixa = '50_100' | '101_200' | '201_400' | '401_800'

export type LocalizacaoWFP = 'sp' | 'rj' | 'nacional' | 'internacional'

export interface IdentidadeEmpresa {
  nomeEmpresa:     string
  setor:           SetorWFP
  mercado:         MercadoWFP
  numColaboradores: ColaboradoresFaixa
  localizacao:     LocalizacaoWFP
}

/* ── Bloco 2 — Momento estratégico ─────────────────────── */

export type MomentoWFP =
  | 'hypergrowth'
  | 'crescimento_saudavel'
  | 'eficiencia_margem'
  | 'transformacao'
  | 'reestruturacao'
  | 'turnaround'
  | 'ma'

export interface MomentoEstrategico {
  momento:        MomentoWFP
  metaProximoAno: string   // campo livre — 1 frase
  gatilhoWFP:     string   // o que desencadeou essa necessidade agora
}

/* ── Bloco 3 — Contexto financeiro ─────────────────────── */

export type CustoPessoasReceita = 'abaixo_30' | '30_45' | '45_60' | 'acima_60' | 'nao_sei'

export type PressaoBudget =
  | 'alta_cortes'
  | 'moderada_otimizacao'
  | 'baixa_crescimento'
  | 'sem_pressao'

export type LiderBudget = 'ceo' | 'cfo' | 'coo' | 'chro' | 'comite' | 'nao_definido'

export interface ContextoFinanceiro {
  custoPessoasReceita: CustoPessoasReceita
  pressaoBudget:       PressaoBudget
  liderBudget:         LiderBudget
}

/* ── Bloco 4 — Maturidade organizacional ───────────────── */

export type MaturidadeDados =
  | 'baixa_planilhas'
  | 'media_hris'
  | 'alta_analytics'

export type MaturidadeLideranca =
  | 'baixa_feeling'
  | 'media_estrutura'
  | 'alta_data_driven'

export type HistoricoWFP = 'nunca' | 'tentamos' | 'basico' | 'bem'

export interface MaturidadeOrganizacional {
  maturidadeDados:      MaturidadeDados
  maturidadeLideranca:  MaturidadeLideranca
  historicoWFP:         HistoricoWFP
}

/* ── Bloco 5 — Contexto político ───────────────────────── */

export type ReacaoCEO = 'cetico' | 'aberto' | 'parceiro' | 'nao_se_envolve'
export type LiderTravar = 'sim' | 'nao' | 'nao_sei'

export interface ContextoPolitico {
  reacaoCEO:           ReacaoCEO
  maiorRiscoPolitico:  string    // campo livre — 1 frase
  liderPoderTravar:    LiderTravar
  liderPoderTravarQuem?: string
}

/* ── Parametrização completa ────────────────────────────── */

export interface ParametrizacaoWFP {
  identidadeEmpresa:      IdentidadeEmpresa
  momentoEstrategico:     MomentoEstrategico
  contextoFinanceiro:     ContextoFinanceiro
  maturidadeOrganizacional: MaturidadeOrganizacional
  contextoPolitico:       ContextoPolitico
}

/* ── Projeto (snake_case = Supabase output) ─────────────── */

export type StatusProjeto = 'parametrizando' | 'ativo' | 'pausado' | 'concluido'
export type StatusEtapa   = 'bloqueada' | 'disponivel' | 'em_andamento' | 'concluida'

export interface WFPEtapaStatus {
  etapaId:     1 | 2 | 3 | 4 | 5 | 6
  status:      StatusEtapa
  concluidoEm?: string
  resumo?:     string
}

export interface WFPProject {
  id:             string
  user_id:        string
  nome:           string
  status:         StatusProjeto
  parametrizacao: ParametrizacaoWFP
  etapas_status:  WFPEtapaStatus[]
  created_at:     string
  updated_at:     string
}

/* ── Etapa — definição ──────────────────────────────────── */

export type EtapaId = 1 | 2 | 3 | 4 | 5 | 6

export interface EtapaDefinicao {
  id:            EtapaId
  numero:        string
  nome:          string
  descricao:     string
  objetivo:      string
  frameworks:    string[]
  inputs:        string[]
  outputs:       string[]
  tempoEstimado: string
}

/* ── Definições das 6 etapas (alinhadas à spec v1.0) ────── */

export const ETAPAS_WFP: EtapaDefinicao[] = [
  {
    id: 1,
    numero: '01',
    nome: 'Ler o Negócio e a Estratégia',
    descricao: 'Diagnóstico financeiro e leitura da postura estratégica antes de qualquer análise de pessoas.',
    objetivo: 'Chegar na conversa com o executivo sabendo mais sobre a empresa do que ele espera que você saiba.',
    frameworks: [
      '4 números de diagnóstico financeiro (Receita/FTE, Custo pessoas/receita, Margem por área, Runway)',
      'Playing to Win — Roger Martin (Where to play + How to win)',
      'Cruzamento modo financeiro × postura estratégica',
    ],
    inputs: [
      'DRE / Relatório financeiro dos últimos 12 meses',
      'Planejamento estratégico ou plano de negócio',
      'Headcount atual por área',
    ],
    outputs: [
      'Diagnóstico de 1 página com modo financeiro + postura estratégica',
      'Os 4 números no contexto da empresa',
      'Frase-síntese da tensão implícita (se houver)',
    ],
    tempoEstimado: '1–2 semanas',
  },
  {
    id: 2,
    numero: '02',
    nome: 'Decifrar a Pergunta Real',
    descricao: 'Descobrir qual das 4 perguntas o executivo está realmente fazendo antes de começar qualquer análise.',
    objetivo: 'Garantir que a análise responde à pergunta certa — não à pergunta declarada.',
    frameworks: [
      '5 perguntas de diagnóstico de intenção',
      'As 4 perguntas reais: A (cortar mantendo output), B (realocar capacidade), C (sustentar com menos), D (adquirir capacidade nova)',
    ],
    inputs: [
      'Conversa com o executivo patrocinador',
      'Contexto da Etapa 1 (modo financeiro + postura)',
    ],
    outputs: [
      'Frase que define a pergunta real do executivo',
      'Alinhamento documentado sobre o tipo de análise a fazer',
    ],
    tempoEstimado: '0,5 semana',
  },
  {
    id: 3,
    numero: '03',
    nome: 'Mapear os Gargalos',
    descricao: 'Identificar onde a empresa está deixando crescimento na mesa por falta de capacidade humana.',
    objetivo: 'Revelar onde está o gargalo real usando método, não feeling.',
    frameworks: [
      'Theory of Constraints — Goldratt (onde forma fila = onde está o gargalo)',
      'Mapa da cadeia de valor (até 7 estágios)',
      'Teste do gargalo (3 perguntas: fila, capacidade, impacto de dobrar)',
      'Classificação: Crítico (vermelho) / Emergente (amarelo) / Sem gargalo (verde)',
    ],
    inputs: [
      'Mapa da cadeia de valor da empresa',
      'Dados de output por função/área',
      'Entrevistas com líderes de área',
    ],
    outputs: [
      'Ranking de 3–5 capacidades críticas para crescimento',
      'Evidência do gargalo por função (dado ou observação validada)',
      'Planilha de mapa da cadeia de valor',
    ],
    tempoEstimado: '1–2 semanas',
  },
  {
    id: 4,
    numero: '04',
    nome: 'Mapear a Capacidade Atual',
    descricao: 'Classificar cada função em Core / Enabler / Run / Legacy com critério e evidência.',
    objetivo: 'Entender o que a empresa tem hoje — e onde realocar para onde investir.',
    frameworks: [
      'Portfólio organizacional BCG / Jesuthasan — Core / Enabler / Run / Legacy',
      'Teste de classificação (3 perguntas: cliente externo, interrupção, unicidade)',
      'Cruzamento gargalo × portfólio (4 situações possíveis)',
    ],
    inputs: [
      'Organograma atualizado (funções, não cargos)',
      'Custo de pessoas por função (últimos 12 meses)',
      'Validação com pelo menos 2 líderes de área',
    ],
    outputs: [
      'Matriz completa Core/Enabler/Run/Legacy com evidências',
      'Top 3 candidatos a desinvestimento com evidência documentada',
      'Slide de mapa visual do portfólio para apresentação',
    ],
    tempoEstimado: '2–3 semanas',
  },
  {
    id: 5,
    numero: '05',
    nome: 'Lente de Realidade',
    descricao: 'Filtrar as recomendações técnicas pela realidade humana, política e contextual da empresa.',
    objetivo: 'Identificar o que pode comprometer a execução antes de apresentar para o executivo.',
    frameworks: [
      'Filtro 1: Maturidade de liderança — Heifetz & Linsky (adaptive work)',
      'Filtro 2: Escassez de mercado — ManpowerGroup + LinkedIn Economic Graph',
      'Filtro 3: Dinâmica política — Pfeffer (inteligência organizacional)',
      'Filtro 4: Prontidão cultural — Kotter + Gallup',
      'Matriz de semáforos (Verde / Amarelo / Vermelho)',
    ],
    inputs: [
      'Resultado das Etapas 1–4',
      'Avaliação de líderes impactados pelo plano',
      'Contexto político preenchido na parametrização',
    ],
    outputs: [
      'Matriz de semáforos por filtro',
      'Implicações práticas por filtro amarelo/vermelho',
      'Plano de mitigação para os riscos identificados',
    ],
    tempoEstimado: '1 semana',
  },
  {
    id: 6,
    numero: '06',
    nome: 'Três Cenários e a Decisão',
    descricao: 'Transformar as análises em três caminhos defensáveis com premissas explícitas e trade-offs claros.',
    objetivo: 'Apresentar ao executivo opções — não uma resposta única — para que a decisão fique no lugar certo.',
    frameworks: [
      'McKinsey Dynamic Resource Allocation',
      'Estrutura Conservador / Base / Agressivo',
      '4 elementos por cenário: premissa, headcount, custo, trade-off',
      '3 frases-âncora para a reunião executiva',
    ],
    inputs: [
      'Resultados das Etapas 1–5',
      'Parâmetros financeiros aprovados',
      'Semáforos da Lente de Realidade',
    ],
    outputs: [
      'Planilha de 3 cenários com cálculos automáticos',
      'Slide executivo de 1 página (tabela comparativa)',
      'Apresentação de defesa do plano (7 slides)',
      'Apresentação de tracking trimestral',
      'Apresentação de encerramento',
    ],
    tempoEstimado: '1–2 semanas',
  },
]
