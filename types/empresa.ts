export interface EmpresaContext {
  id?: string
  user_id?: string
  nome?: string
  setor?: string
  mercado?: string
  porte?: string
  receita_faixa?: string
  momento?: string
  cultura_descricao?: string
  cultura_desafios?: string
  maturidade_rh?: string
  maturidade_lider?: string
  budget_rh?: string
  desafios_top?: string
  meta_ano?: string
  contexto_extra?: string
  updated_at?: string
}

export type Momento = 'Hypergrowth' | 'Eficiência' | 'Transformação' | 'Turnaround' | 'M&A' | 'Steady State'
export type Maturidade = 'Baixa' | 'Média' | 'Alta'
export type Budget = 'Restrito' | 'Moderado' | 'Alto'
export type ModeloRH = 'Generalista' | 'BP+CoE' | 'BP+CoE+SSC' | 'Em estruturação'
export type FiIosofia = 'Hierárquica' | 'Colaborativa' | 'Ágil' | 'Híbrida'
export type Mercado = 'B2B' | 'B2C' | 'B2B2C' | 'Governo'
