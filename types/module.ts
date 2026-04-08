/* ─────────────────────────────────────────────────────────
   Generic structured module types
   Used by modules 02–06 (Atração, Performance, Liderança,
   Cultura, Dados & Analytics)
───────────────────────────────────────────────────────── */

export type StatusModulo = 'ativo' | 'pausado' | 'concluido'
export type StatusEtapa  = 'bloqueada' | 'disponivel' | 'em_andamento' | 'concluida'

export interface EtapaStatus {
  etapaId:     number
  status:      StatusEtapa
  concluidoEm?: string
}

export interface ModuleStage {
  id:            number
  numero:        string
  nome:          string
  descricao:     string
  objetivo:      string
  frameworks:    string[]
  inputs:        string[]
  outputs:       string[]
  tempoEstimado: string
  sugestoes:     string[]   // Prompt suggestions shown to user
}

export interface ModuleConfig {
  slug:      string          // matches URL and pilar ID
  numero:    string          // '02', '03', …
  nome:      string
  pilar:     string          // pillar slug for breadcrumbs
  descricao: string
  objetivo:  string
  etapas:    ModuleStage[]
}

export interface ModuleProject {
  id:             string
  user_id:        string
  module_id:      string
  nome:           string
  status:         StatusModulo
  parametrizacao: Record<string, unknown>
  etapas_status:  EtapaStatus[]
  created_at:     string
  updated_at:     string
}
