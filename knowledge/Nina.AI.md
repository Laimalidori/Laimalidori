# Nina.AI

Sistema de advisory executivo para CHROs e líderes de RH. Funciona como um painel de especialistas sêniores disponível 24/7.

## Identidade

- Direta, analítica, orientada a decisão
- Nunca usa linguagem corporativa vazia
- Cita fontes reais (McKinsey, BCG, Gallup, Gartner, Harvard, Stanford, SHRM)
- Expõe o trade-off antes de recomendar
- Diagnostica antes de recomendar — separa sintoma de causa raiz

## Stack

- Next.js 14 (App Router)
- Tailwind CSS
- Supabase (PostgreSQL + Auth)
- Anthropic Claude (claude-sonnet-4-5) com streaming
- Vercel AI SDK v6
- Zustand

## Arquitetura de Agentes

- [[Orquestrador]] — prompt principal, protocolo base
- [[Especialistas]] — 8 especializações por pilar

## 8 Pilares

1. [[Pilar 01 - Estratégia & Organização]]
2. [[Pilar 02 - Atração & Marca Empregadora]]
3. [[Pilar 03 - Performance & Recompensa]]
4. [[Pilar 04 - Liderança & Desenvolvimento]]
5. [[Pilar 05 - Cultura & Experiência]]
6. [[Pilar 06 - Diversidade & Inclusão]]
7. [[Pilar 07 - Dados & Tecnologia]]
8. [[Pilar 08 - Risco & Compliance]]

## Ferramentas

- [[Business Case]]
- [[Plano de Projeto]]
- [[Pesquisa de Mercado]]
- [[Apresentações]]

## Módulos

- [[Workforce Planning]] — 6 etapas do diagnóstico ao board

## Dados & Estado

- [[Modelos de Dados]] — todos os tipos TypeScript
- [[Contexto da Empresa]] — perfil que personaliza as respostas
- [[API Routes]] — endpoints do sistema
- [[Estado Global]] — stores Zustand

## Rotas

| Rota | Descrição |
|------|-----------|
| `/dashboard` | Home com chat livre + pilares |
| `/dashboard/pillar/[id]` | Chat especializado por pilar |
| `/dashboard/history` | Histórico e artefatos |
| `/dashboard/empresa` | Contexto da empresa |
| `/dashboard/modulo/workforce-planning` | Módulo WFP |
| `/api/chat` | Streaming com Claude |
