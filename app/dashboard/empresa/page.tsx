import { createClient } from '@/lib/supabase/server'
import { EmpresaForm } from '@/components/empresa/EmpresaForm'

export default async function EmpresaPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let empresa = null
  if (user) {
    const { data } = await supabase
      .from('empresa_context')
      .select('*')
      .eq('user_id', user.id)
      .single()
    empresa = data
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="display-md text-text-primary mb-1">Contexto da empresa</h1>
        <p className="body-sm text-text-tertiary">
          Estas informações personalizam todas as recomendações da Nina para a sua realidade.
        </p>
      </div>

      <EmpresaForm initial={empresa ?? undefined} />
    </div>
  )
}
