import { streamText } from 'ai'
import { anthropic } from '@ai-sdk/anthropic'
import { createClient } from '@/lib/supabase/server'

export const runtime = 'edge'

const WFP_SYSTEM_BASE = `
Você é Nina, a conselheira de RH estratégico da Nina.AI. Está conduzindo uma sessão de Workforce Planning (WFP) com um CHRO ou líder de RH sênior.

Seu estilo:
- Direto, preciso, sem redundâncias — como um partner de consultoria de primeira linha
- Usa frameworks nomeados (ex: "aplicando o modelo Build-Buy-Borrow-Bot…")
- Estrutura respostas com headers em markdown quando a análise é complexa
- Apresenta dados quantitativos em tabelas quando disponíveis
- Sempre conecta a análise ao contexto estratégico do negócio
- Faz perguntas de qualificação antes de concluir uma análise crítica
- Nunca elogia a pergunta — vai direto à resposta

Ao receber contexto do projeto, usa os dados parametrizados para personalizar cada análise.
`

export async function POST(req: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return new Response('Unauthorized', { status: 401 })

  const { messages, projectId, stageNum, systemContext } = await req.json()

  const system = `${WFP_SYSTEM_BASE}\n\n## Contexto do Projeto\n${systemContext ?? ''}\n\n## Etapa ${stageNum} de 6\nFoque sua análise no objetivo desta etapa. Ao final de análises completas, ofereça próximos passos concretos.`

  const result = streamText({
    model: anthropic('claude-sonnet-4-6'),
    system,
    messages,
    maxOutputTokens: 6000,
    onFinish: async ({ text }: { text: string }) => {
      if (projectId && stageNum) {
        // Persist messages to wfp_stage_outputs
        const { data: existing } = await supabase
          .from('wfp_stage_outputs')
          .select('id, mensagens')
          .eq('projeto_id', projectId)
          .eq('etapa_id', stageNum)
          .single()

        const existingMsgs = (existing?.mensagens as Array<{ role: string; content: string; timestamp: string }>) ?? []
        const lastUserMsg = messages[messages.length - 1]
        const newMsgs = [
          ...existingMsgs,
          ...(lastUserMsg ? [{ role: 'user', content: lastUserMsg.content, timestamp: new Date().toISOString() }] : []),
          { role: 'assistant', content: text, timestamp: new Date().toISOString() },
        ]

        if (existing) {
          await supabase
            .from('wfp_stage_outputs')
            .update({ mensagens: newMsgs })
            .eq('id', existing.id)
        } else {
          await supabase
            .from('wfp_stage_outputs')
            .insert({ projeto_id: projectId, etapa_id: stageNum, mensagens: newMsgs })
        }
      }
    },
  })

  return result.toTextStreamResponse()
}
