'use client'

import { useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useEmpresaStore } from '@/store/empresa'

export function EmpresaProvider({ children }: { children: React.ReactNode }) {
  const { setEmpresa } = useEmpresaStore()

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data } = await supabase
        .from('empresa_context')
        .select('*')
        .eq('user_id', user.id)
        .single()

      setEmpresa(data ?? null)
    }
    load()
  }, [setEmpresa])

  return <>{children}</>
}
