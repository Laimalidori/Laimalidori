'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'

export function Header() {
  const router = useRouter()

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <header className="flex items-center justify-between h-14 px-6 md:px-8 border-b border-[var(--border)] bg-surface">
      <Link href="/dashboard" className="flex items-baseline gap-2">
        <span className="font-serif text-[18px] font-light text-text-primary tracking-tight">
          Nina
        </span>
        <span className="label text-text-disabled">.AI</span>
      </Link>

      <nav className="hidden md:flex items-center gap-1">
        <Link
          href="/dashboard"
          className="px-3 py-1.5 body-sm text-text-tertiary hover:text-text-secondary transition-colors rounded"
        >
          Início
        </Link>
        <Link
          href="/dashboard/history"
          className="px-3 py-1.5 body-sm text-text-tertiary hover:text-text-secondary transition-colors rounded"
        >
          Histórico
        </Link>
        <Link
          href="/dashboard/empresa"
          className="px-3 py-1.5 body-sm text-text-tertiary hover:text-text-secondary transition-colors rounded"
        >
          Empresa
        </Link>
      </nav>

      <Button variant="ghost" size="sm" onClick={handleSignOut}>
        Sair
      </Button>
    </header>
  )
}
