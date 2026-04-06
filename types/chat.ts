export interface Message {
  id: string
  conversation_id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  metadata?: MessageMetadata
  created_at: string
}

export interface MessageMetadata {
  sources?: string[]
  artifact?: {
    type: ArtifactType
    title: string
  }
  isArtifact?: boolean
}

export interface Conversation {
  id: string
  user_id: string
  pillar_id?: string
  pillar_name?: string
  agent_id?: string
  titulo?: string
  tipo: ConversationType
  status: 'active' | 'archived'
  created_at: string
  updated_at: string
}

export type ConversationType = 'chat' | 'business_case' | 'projeto' | 'apresentacao' | 'pesquisa'
export type ArtifactType = 'business_case' | 'projeto' | 'apresentacao_defesa' | 'apresentacao_tracking' | 'apresentacao_encerramento' | 'pesquisa'

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}
