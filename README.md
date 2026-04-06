# Nina.AI — CHRO Advisory System

Advisory executivo para CHROs e líderes de RH. Funciona como um painel de especialistas sêniores disponível 24/7.

## Stack

- **Next.js 14** (App Router)
- **Tailwind CSS** — design system luxury editorial
- **Supabase** — PostgreSQL + Auth + Realtime
- **Anthropic Claude** (claude-sonnet-4-5) com streaming
- **Vercel AI SDK** v6
- **Zustand** — estado global

## Setup

1. Clone e instale dependências:
   ```bash
   npm install
   ```

2. Configure as variáveis de ambiente:
   ```bash
   cp .env.local.example .env.local
   ```
   Preencha:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ANTHROPIC_API_KEY`

3. Execute o schema no Supabase:
   ```sql
   -- Cole o conteúdo de supabase/schema.sql no SQL Editor do Supabase
   ```

4. Rode localmente:
   ```bash
   npm run dev
   ```

## Estrutura

```
app/
├── (auth)/login          # Login + Magic Link
├── dashboard/            # Home com chat livre + pilares
├── dashboard/pillar/[id] # Chat especializado por pilar
├── dashboard/history     # Histórico e artefatos
├── dashboard/empresa     # Contexto da empresa
└── api/chat              # Streaming com Claude

lib/agents/
├── orchestrator.ts       # System prompt principal da Nina
├── pillars.ts            # 8 pilares + 4 ferramentas
└── specialists.ts        # 8 prompts especializados
```

## 8 Pilares

1. Estratégia & Organização
2. Atração & Marca Empregadora
3. Performance & Recompensa
4. Liderança & Desenvolvimento
5. Cultura & Experiência
6. Diversidade & Inclusão
7. Dados & Tecnologia
8. Risco & Compliance

## Deploy

```bash
npm run build
```

Configure as variáveis de ambiente na Vercel e faça o deploy normalmente.
