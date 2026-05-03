import { streamText } from 'ai'
import { anthropic } from '@ai-sdk/anthropic'
import { createClient } from '@/lib/supabase/server'
import { buildSystemPrompt } from '@/lib/agents/specialists'
import { formatEmpresaContext } from '@/lib/context'
import { saveConversationMessage } from '@/lib/chat-helpers'

export const runtime = 'edge'

export async function POST(req: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return new Response('Unauthorized', { status: 401 })

  const { messages, pillarId, agentId, conversationId } = await req.json()

  const { data: empresa } = await supabase
    .from('empresa_context')
    .select('*')
    .eq('user_id', user.id)
    .single()

  const empresaContext = empresa ? formatEmpresaContext(empresa) : ''
  const systemPrompt = buildSystemPrompt(pillarId, agentId, empresaContext)

  const result = streamText({
    model: anthropic('claude-sonnet-4-6'),
    system: systemPrompt,
    messages,
    maxOutputTokens: 4000,
    onFinish: async ({ text }: { text: string }) => {
      if (conversationId) {
        await saveConversationMessage(supabase, conversationId, text)
      }
    },
  })

  return result.toTextStreamResponse()
}
