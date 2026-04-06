import { createClient } from '@/lib/supabase/server'

export async function POST(req: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return new Response('Unauthorized', { status: 401 })

  const { tipo, titulo, conteudo, conversationId, pillarId, pillarName, metadata } = await req.json()

  if (!tipo || !conteudo) {
    return new Response('Missing required fields', { status: 400 })
  }

  const { data, error } = await supabase
    .from('artifacts')
    .insert({
      user_id: user.id,
      conversation_id: conversationId ?? null,
      tipo,
      titulo: titulo ?? 'Artefato gerado',
      conteudo,
      pillar_id: pillarId ?? null,
      pillar_name: pillarName ?? null,
      metadata: metadata ?? null,
    })
    .select()
    .single()

  if (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }

  return Response.json({ id: data.id })
}
