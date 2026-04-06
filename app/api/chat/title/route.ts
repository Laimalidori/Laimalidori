import { createClient } from '@/lib/supabase/server'
import { anthropic as anthropicClient } from '@/lib/anthropic'

export async function POST(req: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return new Response('Unauthorized', { status: 401 })

  const { message, conversationId } = await req.json()

  try {
    const response = await anthropicClient.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 20,
      messages: [{
        role: 'user',
        content: `Gere um título de 4-6 palavras para uma conversa que começa com: "${message.slice(0, 200)}". Responda APENAS o título, sem pontuação final.`,
      }],
    })

    const title = (response.content[0] as { type: string; text: string }).text?.trim() ?? message.slice(0, 60)

    if (conversationId) {
      await supabase
        .from('conversations')
        .update({ titulo: title })
        .eq('id', conversationId)
    }

    return Response.json({ title })
  } catch {
    return Response.json({ title: message.slice(0, 60) })
  }
}
