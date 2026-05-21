# API Routes

**Parte de:** [[Nina.AI]]

Todas as rotas de API em `app/api/`.

## Chat

| Rota | Descrição |
|------|-----------|
| `POST /api/chat` | Chat principal com pilar/agente — streaming com Claude |
| `POST /api/chat/free` | Chat livre sem pilar selecionado |
| `POST /api/chat/title` | Gera título automático para a conversa |
| `POST /api/chat/wfp` | Chat guiado para etapas do [[Workforce Planning]] |

## Artefato

| Rota | Descrição |
|------|-----------|
| `POST /api/artefato/save` | Salva artefato gerado (business case, projeto, apresentação) |

## Auth

| Rota | Descrição |
|------|-----------|
| `GET /auth/callback` | Callback do Supabase Magic Link |

## Relacionado

- [[Modelos de Dados]] → `Conversation`, `Message`, `ArtifactType`
- [[Especialistas]] — os prompts usados nas rotas de chat
