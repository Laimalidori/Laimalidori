import type { Conversation } from './chat'
import type { ArtifactType } from './chat'

export interface Artifact {
  id: string
  conversation_id?: string
  user_id: string
  tipo: ArtifactType
  titulo: string
  conteudo: string
  pillar_id?: string
  pillar_name?: string
  metadata?: ArtifactMetadata
  created_at: string
  updated_at: string
}

export interface ArtifactMetadata {
  roi?: string
  prazo?: string
  stakeholders?: string[]
  investimento?: string
}

export interface HistoryGroup {
  label: string
  items: HistoryItem[]
}

export interface HistoryItem {
  conversation: Conversation
  artifact?: Artifact
}

export type HistoryFilter = 'all' | 'business_case' | 'projeto' | 'apresentacao' | 'pesquisa' | 'chat'
