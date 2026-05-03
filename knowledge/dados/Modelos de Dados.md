# Modelos de Dados

**Parte de:** [[Nina.AI]]

Todos os tipos TypeScript do projeto. Arquivos em `types/`.

## Agente e Pilares (`types/agent.ts`)

```ts
interface Agent        { id, name }
interface Pillar       { id, number, name, shortName, description, agents[], quickActions[] }
interface Tool         { id, name, description, prompt }
```

Relacionado: [[Pilar 01 - Estratégia & Organização]] … [[Pilar 08 - Risco & Compliance]]

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

Relacionado: [[Contexto da Empresa]]

## Workforce Planning (`types/wfp.ts`)

```ts
interface WFPProject        { id, user_id, nome, status, parametrizacao, etapas_status[], created_at, updated_at }
interface ParametrizacaoWFP { identidadeEmpresa, momentoEstrategico, contextoFinanceiro, maturidadeOrganizacional, contextoPolitico }
interface EtapaDefinicao    { id, numero, nome, descricao, objetivo, frameworks[], inputs[], outputs[], tempoEstimado }
```

Relacionado: [[Workforce Planning]]
