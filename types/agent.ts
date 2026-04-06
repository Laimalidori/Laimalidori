export interface Agent {
  id: string
  name: string
}

export interface QuickAction {
  label: string
  prompt: string
}

export interface Pillar {
  id: string
  number: string
  name: string
  shortName: string
  description: string
  agents: Agent[]
  quickActions: string[]
}

export interface Tool {
  id: string
  name: string
  description: string
  prompt: string
}
