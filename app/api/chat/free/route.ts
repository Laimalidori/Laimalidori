import { streamText } from 'ai'
import { anthropic } from '@ai-sdk/anthropic'
import { createClient } from '@/lib/supabase/server'
import { ORCHESTRATOR_PROMPT } from '@/lib/agents/orchestrator'
import { formatEmpresaContext } from '@/lib/context'

export const runtime = 'edge'

export async function POST(req: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return new Response('Unauthorized', { status: 401 })

  const { messages, conversationId } = await req.json()

  const { data: empresa } = await supabase
    .from('empresa_context')
    .select('*')
    .eq('user_id', user.id)
    .single()

  const empresaContext = empresa ? formatEmpresaContext(empresa) : ''
  const systemPrompt = ORCHESTRATOR_PROMPT +
    (empresaContext
      ? `\n\nCONTEXTO DA EMPRESA:\n${empresaContext}`
      : '\n\nContexto da empresa não configurado.')

  const result = streamText({
    model: anthropic('claude-sonnet-4-5'),
    system: systemPrompt,
    messages,
    maxOutputTokens: 4000,
    onFinish: async ({ text }: { text: string }) => {
      if (conversationId) {
        await supabase.from('messages').insert({
          conversation_id: conversationId,
          role: 'assistant',
          content: text,
        })
        await supabase
          .from('conversations')
          .update({ updated_at: new Date().toISOString() })
          .eq('id', conversationId)
      }
    },
  })

  return result.toTextStreamResponse()
}
