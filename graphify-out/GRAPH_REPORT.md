# Graph Report - /home/user/Laimalidori  (2026-05-03)

## Corpus Check
- Corpus is ~25,156 words - fits in a single context window. You may not need a graph.

## Summary
- 175 nodes · 164 edges · 19 communities detected
- Extraction: 90% EXTRACTED · 10% INFERRED · 0% AMBIGUOUS · INFERRED: 16 edges (avg confidence: 0.8)
- Token cost: 44,705 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Dashboard & Routing|Dashboard & Routing]]
- [[_COMMUNITY_Diagnóstico Cultural|Diagnóstico Cultural]]
- [[_COMMUNITY_Chat API & Agents|Chat API & Agents]]
- [[_COMMUNITY_Auth & Tech Stack|Auth & Tech Stack]]
- [[_COMMUNITY_Pillar Navigation|Pillar Navigation]]
- [[_COMMUNITY_Chat UI Components|Chat UI Components]]
- [[_COMMUNITY_History & Artifacts|History & Artifacts]]
- [[_COMMUNITY_Layout & Navigation|Layout & Navigation]]
- [[_COMMUNITY_Message Rendering|Message Rendering]]
- [[_COMMUNITY_Empresa Context|Empresa Context]]
- [[_COMMUNITY_Middleware & Auth|Middleware & Auth]]
- [[_COMMUNITY_History Route|History Route]]
- [[_COMMUNITY_Empresa Route|Empresa Route]]
- [[_COMMUNITY_Pilar Atração|Pilar Atração]]
- [[_COMMUNITY_Pilar Performance|Pilar Performance]]
- [[_COMMUNITY_Pilar Liderança|Pilar Liderança]]
- [[_COMMUNITY_Pilar Diversidade|Pilar Diversidade]]
- [[_COMMUNITY_Pilar Dados|Pilar Dados]]
- [[_COMMUNITY_Pilar Risco|Pilar Risco]]

## God Nodes (most connected - your core abstractions)
1. `createClient()` - 13 edges
2. `Nina.AI System` - 11 edges
3. `cn()` - 10 edges
4. `createClient()` - 10 edges
5. `Zone 01: Fontes (Input Sources)` - 8 edges
6. `Cultural Diagnosis Flow Architecture (4-Zone)` - 6 edges
7. `formatEmpresaContext()` - 5 edges
8. `Badge()` - 4 edges
9. `ChatInterface()` - 4 edges
10. `app/api/chat — Streaming with Claude` - 4 edges

## Surprising Connections (you probably didn't know these)
- `Input 02: Estratégia (Strategy)` --semantically_similar_to--> `Pillar 01: Estratégia & Organização`  [INFERRED] [semantically similar]
  public/cultura-diagram.html → README.md
- `POST()` --calls--> `formatEmpresaContext()`  [INFERRED]
  app/api/chat/free/route.ts → lib/context.ts
- `Zone 02: Processamento (Nina Brain)` --implements--> `Nina.AI System`  [EXTRACTED]
  public/cultura-diagram.html → README.md
- `Pillar 05: Cultura & Experiência` --conceptually_related_to--> `Cultural Diagnosis Flow Architecture (4-Zone)`  [INFERRED]
  README.md → public/cultura-diagram.html
- `middleware()` --calls--> `updateSession()`  [INFERRED]
  middleware.ts → lib/supabase/middleware.ts

## Hyperedges (group relationships)
- **Nina Brain processes inputs through Venn cultural mapping to produce final culture** — zona_processamento, zona_mapeamento, convergencia_valores, cultura_final [EXTRACTED 0.95]
- **Orchestrator + Pillars + Specialists form Nina agent layer** — orchestrator_ts, pillars_ts, specialists_ts [EXTRACTED 0.95]
- **Aspirada, Exigida, and Atual cultures intersect to define Final Culture** — cultura_aspirada, cultura_exigida, cultura_atual, cultura_final [EXTRACTED 0.95]

## Communities (41 total, 13 thin omitted)

### Community 1 - "Diagnóstico Cultural"
Cohesion: 0.11
Nodes (21): Convergência — Intersection Zone (up to 7 values), Cultura Aspirada (Aspired Culture), Cultura Atual (Current Culture — Starting Point), Nina.AI Cultural Diagnosis Flow Diagram, Cultura Exigida (Required Culture), Cultura Final (Final Culture Values), Cultural Diagnosis Flow Architecture (4-Zone), Input 07: Blockers Mapeados (Mapped Blockers) (+13 more)

### Community 2 - "Chat API & Agents"
Cohesion: 0.13
Nodes (7): buildSystemPrompt(), POST(), POST(), formatEmpresaContext(), createClient(), getMsgText(), POST()

### Community 3 - "Auth & Tech Stack"
Cohesion: 0.15
Nodes (17): Anthropic Claude (claude-sonnet-4-5) with Streaming, app/api/chat — Streaming with Claude, app/(auth)/login — Login + Magic Link, CLAUDE.md — Graphify Configuration, app/dashboard — Home with Free Chat + Pillars, Graphify Knowledge Graph, Next.js 14 (App Router), Nina.AI System (+9 more)

### Community 4 - "Pillar Navigation"
Cohesion: 0.13
Nodes (6): getPillarById(), ChatInterface(), QuickActions(), PillarCard(), PillarGrid(), ToolsGrid()

### Community 6 - "History & Artifacts"
Cohesion: 0.25
Nodes (3): ArtifactCard(), HistoryItem(), Badge()

### Community 7 - "Layout & Navigation"
Cohesion: 0.25
Nodes (3): EmpresaProvider(), MobileNav(), Sidebar()

## Knowledge Gaps
- **23 isolated node(s):** `CLAUDE.md — Graphify Configuration`, `Nina.AI Cultural Diagnosis Flow Diagram`, `Next.js 14 (App Router)`, `Tailwind CSS — Luxury Editorial Design System`, `Zustand — Global State Management` (+18 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **13 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `createClient()` connect `Dashboard & Routing` to `Empresa Context`, `Pillar Navigation`, `History & Artifacts`, `Layout & Navigation`?**
  _High betweenness centrality (0.199) - this node is a cross-community bridge._
- **Why does `createClient()` connect `Chat API & Agents` to `Empresa Context`, `History & Artifacts`, `Layout & Navigation`?**
  _High betweenness centrality (0.119) - this node is a cross-community bridge._
- **What connects `CLAUDE.md — Graphify Configuration`, `Nina.AI Cultural Diagnosis Flow Diagram`, `Next.js 14 (App Router)` to the rest of the system?**
  _23 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Dashboard & Routing` be split into smaller, more focused modules?**
  _Cohesion score 0.09 - nodes in this community are weakly interconnected._
- **Should `Diagnóstico Cultural` be split into smaller, more focused modules?**
  _Cohesion score 0.11 - nodes in this community are weakly interconnected._
- **Should `Chat API & Agents` be split into smaller, more focused modules?**
  _Cohesion score 0.13 - nodes in this community are weakly interconnected._
- **Should `Pillar Navigation` be split into smaller, more focused modules?**
  _Cohesion score 0.13 - nodes in this community are weakly interconnected._