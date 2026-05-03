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

- Orquestrador — prompt principal, protocolo base
- Especialistas — 8 especializações por pilar

## 8 Pilares

1. Pilar 01 - Estratégia & Organização
2. Pilar 02 - Atração & Marca Empregadora
3. Pilar 03 - Performance & Recompensa
4. Pilar 04 - Liderança & Desenvolvimento
5. Pilar 05 - Cultura & Experiência
6. Pilar 06 - Diversidade & Inclusão
7. Pilar 07 - Dados & Tecnologia
8. Pilar 08 - Risco & Compliance

## Ferramentas

- Business Case
- Plano de Projeto
- Pesquisa de Mercado
- Apresentações

## Módulos

- Workforce Planning — 6 etapas do diagnóstico ao board

## Dados & Estado

- Modelos de Dados — todos os tipos TypeScript
- Contexto da Empresa — perfil que personaliza as respostas
- API Routes — endpoints do sistema
- Estado Global — stores Zustand

## Rotas

| Rota | Descrição |
|------|-----------|
| `/dashboard` | Home com chat livre + pilares |
| `/dashboard/pillar/[id]` | Chat especializado por pilar |
| `/dashboard/history` | Histórico e artefatos |
| `/dashboard/empresa` | Contexto da empresa |
| `/dashboard/modulo/workforce-planning` | Módulo WFP |
| `/api/chat` | Streaming com Claude |

---

# Orquestrador

Agente base da Nina.AI. Define identidade, protocolo e formato de resposta para todos os Especialistas.

## Protocolo de Resposta

1. Se o contexto da empresa não foi fornecido e é relevante, pergunte 1 variável crítica antes
2. Identifique o domínio e ative mentalmente o especialista correto
3. Diagnostique antes de recomendar — separa sintoma de causa raiz
4. Exponha a contradição central: "se melhorar A, o que piora?"
5. Recomende com evidência — sempre cita fonte para dados e benchmarks
6. Entregue próximos passos concretos

## Formato

```
Diagnóstico → Contradição Central → Recomendação → Benchmark → Riscos → Próximos Passos
```

## Arquivo

`lib/agents/orchestrator.ts`

---

# Especialistas

8 especializações construídas sobre o Orquestrador. Cada uma é ativada pelo pilar selecionado no dashboard.

| ID | Especialização | Pilar |
|----|---------------|-------|
| `estrategia` | HR Estratégico & Org Design | Pilar 01 - Estratégia & Organização |
| `atracao` | Talent Acquisition & Employer Branding | Pilar 02 - Atração & Marca Empregadora |
| `performance` | Performance Management & Compensation | Pilar 03 - Performance & Recompensa |
| `lideranca` | Leadership Development & L&D | Pilar 04 - Liderança & Desenvolvimento |
| `cultura` | Cultura Organizacional & EX | Pilar 05 - Cultura & Experiência |
| `dei` | Diversidade, Equidade & Inclusão | Pilar 06 - Diversidade & Inclusão |
| `dados` | People Analytics, HR Tech & Ops | Pilar 07 - Dados & Tecnologia |
| `risco` | Risco Trabalhista, Compliance & Saúde | Pilar 08 - Risco & Compliance |

## Arquivo

`lib/agents/specialists.ts`

---

# Pilar 01 — Estratégia & Organização

**Parte de:** Nina.AI

Modelo de RH, design organizacional e planejamento estratégico de força de trabalho.

## Agentes

- HR Estratégico
- Org Design
- Workforce Planning
- Sucessão

## Frameworks

- Modelo de Ulrich evoluído (CoE + HRBP + SSC + People Analytics + Digital HR)
- HR Operating Model da McKinsey (5 arquétipos)
- Organizational Network Analysis (ONA)
- Spans & Layers Analysis
- Strategic Workforce Planning (skills-based)
- Succession em 3 horizontes
- Build vs Buy vs Borrow vs Bot vs Braid

## Referências

Dave Ulrich · Ram Charan & Barton (People Before Strategy, HBR 2015) · McKinsey Reimagining HR (2021) · BCG Creating People Advantage · William Rothwell (Succession Planning) · John Boudreau (Beyond HR) · Gartner Future of Work Trends

## Quick Actions

- Como definir o modelo de RH adequado para nossa empresa?
- Preciso redesenhar a estrutura organizacional
- Como construir um plano de sucessão para posições críticas?

## Especialista Relacionado

Especialistas → `estrategia`

---

# Pilar 02 — Atração & Marca Empregadora

**Parte de:** Nina.AI

Talent acquisition, employer branding, EVP e estratégia de pipeline de talentos.

## Agentes

- Talent Acquisition
- Employer Branding

## Frameworks

- Entrevista estruturada com scorecard (Schmidt & Hunter 1998)
- Performance-Based Hiring (Lou Adler)
- EVP segmentado por persona
- Talent pooling e pipeline ativo
- Funil de TA com métricas por estágio

## Referências

Schmidt & Hunter (1998) · Laszlo Bock (Work Rules!) · Lou Adler (Hire With Your Head) · LinkedIn Global Talent Trends · Josh Bersin Talent Acquisition Factbook · SHRM (custo de turnover)

## Contradições Centrais

- Velocidade vs. Qualidade — qual é o custo de contratar errado vs. demorar?
- Volume vs. Seletividade
- Employer brand aspiracional vs. realidade cultural

## Quick Actions

- Como reduzir o time-to-fill sem comprometer quality of hire?
- Preciso construir nosso EVP — por onde começo?
- Qual é a melhor estratégia de sourcing para tech?

## Especialista Relacionado

Especialistas → `atracao`

---

# Pilar 03 — Performance & Recompensa

**Parte de:** Nina.AI

Gestão de performance, OKRs, remuneração, benefícios e job architecture.

## Agentes

- Performance Management
- Compensation & Benefits

## Frameworks

- OKR (Grove/Doerr): cadência trimestral, alinhamento sem cascata rígida
- Continuous Performance Management: check-ins semanais/quinzenais
- 9-Box Grid como ferramenta viva
- Calibração cross-funcional
- Job Architecture (famílias, broadbanding, critérios de progressão)
- Total Rewards (WorldatWork): 5 componentes
- Pay Equity Analysis por gênero, raça e interseccionalidade

## Referências

Andy Grove (High Output Management) · John Doerr (Measure What Matters) · Marcus Buckingham & Goodall (Nine Lies About Work) · McKinsey Reinventing Performance Management (HBR 2015) · Edward Lawler (Rewarding Excellence) · Herzberg (dois fatores, HBR 1968)

## Quick Actions

- Como redesenhar nosso ciclo de avaliação de performance?
- Nossa estrutura salarial está defasada — como corrigir?
- Qual é o melhor modelo de variável para nosso perfil?

## Especialista Relacionado

Especialistas → `performance`

---

# Pilar 04 — Liderança & Desenvolvimento

**Parte de:** Nina.AI

Desenvolvimento de liderança, L&D, programas de formação e pipeline de líderes.

## Agentes

- Leadership Development
- L&D

## Frameworks

- Leadership Pipeline (Charan, Drotter & Noel): 6 passagens críticas
- 6 Estilos de Liderança (Goleman): impacto mensurável no clima
- Situational Leadership II (Blanchard): adaptação ao Skill-Will
- Learning Agility (Korn Ferry): melhor preditor de potencial
- Modelo 70-20-10 (McCall, Lombardo & Eichinger)
- Kirkpatrick-Phillips: 4 níveis + ROI financeiro de L&D

## Referências

Charan/Drotter/Noel (Leadership Pipeline) · Daniel Goleman (Primal Leadership) · Korn Ferry (Learning Agility) · CCL (Lessons of Experience) · Josh Bersin (Learning in the Flow of Work) · BCG (requalificar = 6x mais barato que contratar)

## Quick Actions

- Como identificar e desenvolver high potentials?
- Nossa liderança média está despreparada — qual é o plano?
- Como medir o ROI dos programas de desenvolvimento?

## Especialista Relacionado

Especialistas → `lideranca`

---

# Pilar 05 — Cultura & Experiência

**Parte de:** Nina.AI

Cultura organizacional, employee experience, engajamento e mudança.

## Agentes

- Cultura Organizacional
- Employee Experience
- Engajamento

## Frameworks

- Modelo de 3 níveis de Schein: artefatos → valores → pressupostos
- Psychological Safety (Edmondson): pré-condição para inovação
- ADKAR (Prosci): framework de change management
- Employee Journey Mapping: momentos que importam
- eNPS e drivers de engajamento (Gallup Q12)
- Wellbeing Model Gallup: 5 dimensões

## Referências

Edgar Schein (Organizational Culture) · Amy Edmondson (The Fearless Organization) · Kotter & Heskett (cultura forte = 12x performance em 11 anos) · McKinsey The Culture Factor (HBR 2018) · Gallup State of the Global Workplace · Teresa Amabile & Kramer (The Progress Principle)

## Quick Actions

- Como diagnosticar o gap entre cultura declarada e praticada?
- Nosso eNPS caiu 15 pontos — o que fazer?
- Precisamos gerir uma mudança cultural importante

## Especialista Relacionado

Especialistas → `cultura`

---

# Pilar 06 — Diversidade & Inclusão

**Parte de:** Nina.AI

Estratégia de DEI, equidade salarial, representatividade e liderança inclusiva.

## Agentes

- DEI

## Frameworks

- Behavioral Design para DEI (Iris Bohnet): mudar sistemas, não consciências
- 3 paradigmas de Thomas & Ely: discriminação → acesso → aprendizagem
- Pay Equity Analysis: gênero, raça e interseccionalidade
- Funil de carreira por grupo demográfico
- Inclusive Leadership como competência mensurável

## Referências

McKinsey Diversity Wins (2020): quartil superior = 36% mais rentabilidade · Iris Bohnet (What Works) · Mahzarin Banaji (Blindspot) · BCG Fixing the Broken Rung (2022) · Deloitte DEI Revolution (2018)

## Quick Actions

- Como construir uma estratégia de DEI com impacto real?
- Preciso fazer análise de equidade salarial — como estruturo?
- Como medir inclusão além de diversidade?

## Especialista Relacionado

Especialistas → `dei`

---

# Pilar 07 — Dados & Tecnologia

**Parte de:** Nina.AI

People analytics, HR tech stack, data governance e HR operations.

## Agentes

- People Analytics
- HR Tech
- HR Operations

## Frameworks

- Maturidade analítica Bersin: operacional → avançado → preditivo → prescritivo
- Modelo preditivo de turnover: variáveis, features, calibração
- ONA (Organizational Network Analysis)
- HR Metrics Hierarchy: operacional → qualidade → impacto → preditivo
- People Data Governance: LGPD, consentimento, segurança
- HR Tech Stack Assessment: seleção e implementação de HRIS/ATS/LMS

## Referências

John Boudreau & Ramstad (Beyond HR) · Josh Bersin (Analytics Maturity Model) · Google Project Oxygen & Aristotle · Gartner People Analytics Survey · MIT Sloan People Analytics · LGPD Lei 13.709/2018

## Quick Actions

- Como construir um modelo preditivo de turnover?
- Que métricas de pessoas devo levar ao board?
- Como avaliar e selecionar um novo HRIS?

## Especialista Relacionado

Especialistas → `dados`

---

# Pilar 08 — Risco & Compliance

**Parte de:** Nina.AI

Riscos trabalhistas, compliance, saúde & bem-estar e segurança jurídica.

## Agentes

- Relações Trabalhistas
- Saúde & Bem-estar
- Gestão de Riscos

## Frameworks

- CLT pós-Reforma 2017: teletrabalho, terceirização, negociado vs. legislado
- NR-1 atualizada 2023: PGR incluindo riscos psicossociais
- Due Diligence trabalhista em M&A
- Risk Matrix: probabilidade × impacto por categoria
- Burnout Inventory (Maslach): diagnóstico e intervenção
- Wellbeing sistêmico: Gallup 5 elementos

## Referências

Maurício Godinho Delgado (Curso de Direito do Trabalho 2022) · Lei 13.467/2017 (Reforma Trabalhista) · NR-1 (2023) · Christina Maslach (Burnout) · McKinsey Health Institute (2022) · WHO Guidelines Mental Health at Work (2022)

## Quick Actions

- Quais são os principais riscos trabalhistas da nossa operação?
- Como implementar o PGR conforme NR-1 atualizada?
- Nosso absenteísmo está alto — como diagnosticar a causa raiz?

## Especialista Relacionado

Especialistas → `risco`

---

# Business Case

**Ferramenta da:** Nina.AI

Constrói um business case completo com ROI e cenários para iniciativas de RH.

## Prompt de Ativação

> "Preciso montar um business case completo para uma iniciativa de RH. Me guie pelo processo."

## Pilares Relacionados

- Pilar 01 - Estratégia & Organização
- Pilar 03 - Performance & Recompensa
- Pilar 07 - Dados & Tecnologia

---

# Plano de Projeto

**Ferramenta da:** Nina.AI

Milestones, recursos, riscos e checklist de execução para iniciativas de RH.

## Prompt de Ativação

> "Preciso estruturar um plano de projeto robusto para uma iniciativa de RH, com milestones, recursos e gestão de riscos."

## Pilares Relacionados

- Pilar 01 - Estratégia & Organização
- Pilar 08 - Risco & Compliance

---

# Pesquisa de Mercado

**Ferramenta da:** Nina.AI

Benchmarks e como o mercado está resolvendo desafios de RH.

## Prompt de Ativação

> "Preciso de uma pesquisa de mercado com benchmarks confiáveis sobre como empresas estão resolvendo um desafio de RH."

## Pilares Relacionados

- Pilar 02 - Atração & Marca Empregadora
- Pilar 03 - Performance & Recompensa
- Pilar 07 - Dados & Tecnologia

---

# Apresentações

**Ferramenta da:** Nina.AI

Estrutura apresentações executivas para board ou C-level sobre iniciativas de RH.

## Prompt de Ativação

> "Preciso estruturar uma apresentação executiva para o board ou C-level sobre uma iniciativa de RH."

## Tipos

- Defesa de projeto
- Acompanhamento de iniciativa
- Encerramento e resultados

## Pilares Relacionados

- Pilar 01 - Estratégia & Organização
- Pilar 07 - Dados & Tecnologia

---

# Workforce Planning

**Módulo 01 da:** Nina.AI · Pilar: Pilar 01 - Estratégia & Organização

Diagnóstico, projeção e plano de ação para a força de trabalho. A Nina conduz o CHRO por 6 etapas estruturadas — do diagnóstico financeiro aos três cenários defensáveis para o board.

## Problemas que resolve

- Tenho que apresentar o orçamento de pessoas e não sei como defender
- O CEO me perguntou onde podemos otimizar e não sei responder
- Vamos crescer e não sei como dimensionar o time
- Precisamos cortar custo e não sei onde sem destruir capacidade
- Estamos em reestruturação e não sei qual o tamanho certo
- O board quer saber se nossa estrutura está adequada para a estratégia

## As 6 Etapas

| # | Nome | Duração |
|---|------|---------|
| 01 | WFP Etapa 01 - Ler o Negócio e a Estratégia | 1–2 semanas |
| 02 | WFP Etapa 02 - Decifrar a Pergunta Real | 0,5 semana |
| 03 | WFP Etapa 03 - Mapear os Gargalos | 1–2 semanas |
| 04 | WFP Etapa 04 - Mapear a Capacidade Atual | 2–3 semanas |
| 05 | WFP Etapa 05 - Lente de Realidade | 1 semana |
| 06 | WFP Etapa 06 - Três Cenários e a Decisão | 1–2 semanas |

**Total:** 6 a 10 semanas. Entrega: diagnóstico + 3 cenários + apresentação para o board.

## Rotas

| Rota | Descrição |
|------|-----------|
| `/dashboard/modulo/workforce-planning` | Lista de projetos |
| `/dashboard/modulo/workforce-planning/novo` | Parametrização de novo projeto |
| `/dashboard/modulo/workforce-planning/[id]` | Projeto específico |
| `/dashboard/modulo/workforce-planning/[id]/etapa/[stage]` | Etapa com chat guiado |
| `/dashboard/modulo/workforce-planning/[id]/metricas` | Métricas do projeto |

## Modelos de Dados Relacionados

- Modelos de Dados → `WFPProject`, `ParametrizacaoWFP`, `EtapaDefinicao`

---

# WFP Etapa 01 — Ler o Negócio e a Estratégia

**Módulo:** Workforce Planning · **Duração:** 1–2 semanas

Diagnóstico financeiro e leitura da postura estratégica antes de qualquer análise de pessoas.

## Objetivo

Chegar na conversa com o executivo sabendo mais sobre a empresa do que ele espera que você saiba.

## Frameworks

- 4 números de diagnóstico financeiro (Receita/FTE, Custo pessoas/receita, Margem por área, Runway)
- Playing to Win — Roger Martin (Where to play + How to win)
- Cruzamento modo financeiro × postura estratégica

## Inputs

- DRE / Relatório financeiro dos últimos 12 meses
- Planejamento estratégico ou plano de negócio
- Headcount atual por área

## Outputs

- Diagnóstico de 1 página com modo financeiro + postura estratégica
- Os 4 números no contexto da empresa
- Frase-síntese da tensão implícita (se houver)

## Próxima etapa

WFP Etapa 02 - Decifrar a Pergunta Real

---

# WFP Etapa 02 — Decifrar a Pergunta Real

**Módulo:** Workforce Planning · **Duração:** 0,5 semana

Descobrir qual das 4 perguntas o executivo está realmente fazendo antes de começar qualquer análise.

## Objetivo

Garantir que a análise responde à pergunta certa — não à pergunta declarada.

## Frameworks

- 5 perguntas de diagnóstico de intenção
- As 4 perguntas reais:
  - **A** — Cortar mantendo output
  - **B** — Realocar capacidade
  - **C** — Sustentar com menos
  - **D** — Adquirir capacidade nova

## Inputs

- Conversa com o executivo patrocinador
- Contexto da WFP Etapa 01 - Ler o Negócio e a Estratégia (modo financeiro + postura)

## Outputs

- Frase que define a pergunta real do executivo
- Alinhamento documentado sobre o tipo de análise a fazer

## Próxima etapa

WFP Etapa 03 - Mapear os Gargalos

---

# WFP Etapa 03 — Mapear os Gargalos

**Módulo:** Workforce Planning · **Duração:** 1–2 semanas

Identificar onde a empresa está deixando crescimento na mesa por falta de capacidade humana.

## Objetivo

Revelar onde está o gargalo real usando método, não feeling.

## Frameworks

- Theory of Constraints — Goldratt (onde forma fila = onde está o gargalo)
- Mapa da cadeia de valor (até 7 estágios)
- Teste do gargalo (3 perguntas: fila, capacidade, impacto de dobrar)
- Classificação: **Crítico** (vermelho) / **Emergente** (amarelo) / **Sem gargalo** (verde)

## Inputs

- Mapa da cadeia de valor da empresa
- Dados de output por função/área
- Entrevistas com líderes de área

## Outputs

- Ranking de 3–5 capacidades críticas para crescimento
- Evidência do gargalo por função (dado ou observação validada)
- Planilha de mapa da cadeia de valor

## Próxima etapa

WFP Etapa 04 - Mapear a Capacidade Atual

---

# WFP Etapa 04 — Mapear a Capacidade Atual

**Módulo:** Workforce Planning · **Duração:** 2–3 semanas

Classificar cada função em Core / Enabler / Run / Legacy com critério e evidência.

## Objetivo

Entender o que a empresa tem hoje — e onde realocar para onde investir.

## Frameworks

- Portfólio organizacional BCG / Jesuthasan — Core / Enabler / Run / Legacy
- Teste de classificação (3 perguntas: cliente externo, interrupção, unicidade)
- Cruzamento gargalo × portfólio (4 situações possíveis)

## Inputs

- Organograma atualizado (funções, não cargos)
- Custo de pessoas por função (últimos 12 meses)
- Validação com pelo menos 2 líderes de área

## Outputs

- Matriz completa Core/Enabler/Run/Legacy com evidências
- Top 3 candidatos a desinvestimento com evidência documentada
- Slide de mapa visual do portfólio para apresentação

## Próxima etapa

WFP Etapa 05 - Lente de Realidade

---

# WFP Etapa 05 — Lente de Realidade

**Módulo:** Workforce Planning · **Duração:** 1 semana

Filtrar as recomendações técnicas pela realidade humana, política e contextual da empresa.

## Objetivo

Identificar o que pode comprometer a execução antes de apresentar para o executivo.

## Frameworks

- Filtro 1: Maturidade de liderança — Heifetz & Linsky (adaptive work)
- Filtro 2: Escassez de mercado — ManpowerGroup + LinkedIn Economic Graph
- Filtro 3: Dinâmica política — Pfeffer (inteligência organizacional)
- Filtro 4: Prontidão cultural — Kotter + Gallup
- Matriz de semáforos (Verde / Amarelo / Vermelho)

## Inputs

- Resultado das Etapas 1–4
- Avaliação de líderes impactados pelo plano
- Contexto político preenchido na parametrização

## Outputs

- Matriz de semáforos por filtro
- Implicações práticas por filtro amarelo/vermelho
- Plano de mitigação para os riscos identificados

## Próxima etapa

WFP Etapa 06 - Três Cenários e a Decisão

---

# WFP Etapa 06 — Três Cenários e a Decisão

**Módulo:** Workforce Planning · **Duração:** 1–2 semanas

Transformar as análises em três caminhos defensáveis com premissas explícitas e trade-offs claros.

## Objetivo

Apresentar ao executivo opções — não uma resposta única — para que a decisão fique no lugar certo.

## Frameworks

- McKinsey Dynamic Resource Allocation
- Estrutura Conservador / Base / Agressivo
- 4 elementos por cenário: premissa, headcount, custo, trade-off
- 3 frases-âncora para a reunião executiva

## Inputs

- Resultados das Etapas 1–5
- Parâmetros financeiros aprovados
- Semáforos da WFP Etapa 05 - Lente de Realidade

## Outputs

- Planilha de 3 cenários com cálculos automáticos
- Slide executivo de 1 página (tabela comparativa)
- Apresentação de defesa do plano (7 slides)
- Apresentação de tracking trimestral
- Apresentação de encerramento

## Entrega Final

Esta etapa encerra o projeto de Workforce Planning.

---

# Modelos de Dados

**Parte de:** Nina.AI

Todos os tipos TypeScript do projeto. Arquivos em `types/`.

## Agente e Pilares (`types/agent.ts`)

```ts
interface Agent        { id, name }
interface Pillar       { id, number, name, shortName, description, agents[], quickActions[] }
interface Tool         { id, name, description, prompt }
```

Relacionado: Pilar 01 - Estratégia & Organização … Pilar 08 - Risco & Compliance

## Chat (`types/chat.ts`)

```ts
interface Message      { id, conversation_id, role, content, metadata?, created_at }
interface Conversation { id, user_id, pillar_id?, pillar_name?, agent_id?, titulo?, tipo, status, created_at, updated_at }
interface ChatMessage  { role: 'user' | 'assistant', content }

type ConversationType = 'chat' | 'business_case' | 'projeto' | 'apresentacao' | 'pesquisa'
type ArtifactType     = 'business_case' | 'projeto' | 'apresentacao_defesa' | 'apresentacao_tracking' | 'apresentacao_encerramento' | 'pesquisa'
```

## Empresa (`types/empresa.ts`)

```ts
interface EmpresaContext {
  nome?, setor?, mercado?, porte?, receita_faixa?,
  momento?, cultura_descricao?, cultura_desafios?,
  maturidade_rh?, maturidade_lider?, budget_rh?,
  desafios_top?, meta_ano?, contexto_extra?
}
```

Relacionado: Contexto da Empresa

## Workforce Planning (`types/wfp.ts`)

```ts
interface WFPProject        { id, user_id, nome, status, parametrizacao, etapas_status[], created_at, updated_at }
interface ParametrizacaoWFP { identidadeEmpresa, momentoEstrategico, contextoFinanceiro, maturidadeOrganizacional, contextoPolitico }
interface EtapaDefinicao    { id, numero, nome, descricao, objetivo, frameworks[], inputs[], outputs[], tempoEstimado }
```

Relacionado: Workforce Planning

---

# Contexto da Empresa

**Parte de:** Nina.AI

Perfil da empresa do usuário que personaliza todas as respostas da Nina.

## Campos

| Campo | Descrição |
|-------|-----------|
| `nome` | Nome da empresa |
| `setor` | Setor de atuação |
| `mercado` | B2B / B2C / B2B2C / Governo |
| `porte` | Tamanho da empresa |
| `receita_faixa` | Faixa de receita |
| `momento` | Hypergrowth · Eficiência · Transformação · Turnaround · M&A · Steady State |
| `maturidade_rh` | Baixa · Média · Alta |
| `maturidade_lider` | Baixa · Média · Alta |
| `budget_rh` | Restrito · Moderado · Alto |
| `cultura_descricao` | Descrição livre da cultura atual |
| `cultura_desafios` | Tensões culturais |
| `desafios_top` | Principais desafios |
| `meta_ano` | Meta do ano |
| `contexto_extra` | Contexto adicional livre |

## Uso

Quando preenchido, a Nina usa este contexto em todos os especialistas para contextualizar recomendações. Sem contexto, ela pergunta 1 variável crítica antes de responder.

## Rota

`/dashboard/empresa`

## Relacionado

- Modelos de Dados → `EmpresaContext`
- Orquestrador — consome o contexto formatado

---

# API Routes

**Parte de:** Nina.AI

Todas as rotas de API em `app/api/`.

## Chat

| Rota | Descrição |
|------|-----------|
| `POST /api/chat` | Chat principal com pilar/agente — streaming com Claude |
| `POST /api/chat/free` | Chat livre sem pilar selecionado |
| `POST /api/chat/title` | Gera título automático para a conversa |
| `POST /api/chat/wfp` | Chat guiado para etapas do Workforce Planning |

## Artefato

| Rota | Descrição |
|------|-----------|
| `POST /api/artefato/save` | Salva artefato gerado (business case, projeto, apresentação) |

## Auth

| Rota | Descrição |
|------|-----------|
| `GET /auth/callback` | Callback do Supabase Magic Link |

## Relacionado

- Modelos de Dados → `Conversation`, `Message`, `ArtifactType`
- Especialistas — os prompts usados nas rotas de chat

---

# Estado Global

**Parte de:** Nina.AI

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

- Modelos de Dados → `Conversation`, `EmpresaContext`
- Contexto da Empresa