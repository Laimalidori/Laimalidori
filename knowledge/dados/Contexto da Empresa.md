# Contexto da Empresa

**Parte de:** [[Nina.AI]]

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

- [[Modelos de Dados]] → `EmpresaContext`
- [[Orquestrador]] — consome o contexto formatado
