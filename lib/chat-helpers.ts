import type { SupabaseClient } from '@supabase/supabase-js'

type MessagePart = { type: string; text?: string }
type Message = { content?: unknown; parts?: unknown[] }

export function getMsgText(msg: Message): string {
  if (typeof msg.content === 'string') return msg.content
  if (Array.isArray(msg.parts)) {
    return (msg.parts as MessagePart[])
      .filter((p) => p.type === 'text')
      .map((p) => p.text ?? '')
      .join('')
  }
  if (Array.isArray(msg.content)) {
    return (msg.content as MessagePart[])
      .filter((p) => p.type === 'text')
      .map((p) => p.text ?? '')
      .join('')
  }
  return ''
}

export async function saveConversationMessage(
  supabase: SupabaseClient,
  conversationId: string,
  text: string
): Promise<void> {
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
