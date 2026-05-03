# Estado Global

**Parte de:** [[Nina.AI]]

Stores Zustand em `store/`.

## chat.ts — `useChatStore`

Gerencia a conversa ativa.

| Estado | Tipo | Descrição |
|--------|------|-----------|
| `activeConversationId` | `string \| null` | ID da conversa em aberto |
| `activeConversation` | `Conversation \| null` | Objeto completo da conversa |
| `activePillarId` | `string \| null` | Pilar selecionado |
| `activeAgentId` | `string \| null` | Agente selecionado |

## empresa.ts — `useEmpresaStore`

Gerencia o contexto da empresa do usuário.

| Estado | Tipo | Descrição |
|--------|------|-----------|
| `empresa` | `EmpresaContext \| null` | Perfil da empresa |
| `isLoaded` | `boolean` | Se o contexto já foi carregado do Supabase |

## ui.ts — `useUIStore`

Estado da interface (sidebar, modais, etc.)

## Relacionado

- [[Modelos de Dados]] → `Conversation`, `EmpresaContext`
- [[Contexto da Empresa]]
