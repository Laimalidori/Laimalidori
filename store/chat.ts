import { create } from 'zustand'
import type { Conversation } from '@/types/chat'

interface ChatStore {
  activeConversationId: string | null
  activeConversation: Conversation | null
  activePillarId: string | null
  activeAgentId: string | null
  setActiveConversation: (conversation: Conversation | null) => void
  setActivePillar: (pillarId: string | null) => void
  setActiveAgent: (agentId: string | null) => void
  clearActive: () => void
}

export const useChatStore = create<ChatStore>((set) => ({
  activeConversationId: null,
  activeConversation: null,
  activePillarId: null,
  activeAgentId: null,
  setActiveConversation: (conversation) =>
    set({
      activeConversation: conversation,
      activeConversationId: conversation?.id ?? null,
    }),
  setActivePillar: (pillarId) => set({ activePillarId: pillarId }),
  setActiveAgent: (agentId) => set({ activeAgentId: agentId }),
  clearActive: () =>
    set({
      activeConversationId: null,
      activeConversation: null,
      activePillarId: null,
      activeAgentId: null,
    }),
}))
