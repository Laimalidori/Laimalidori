'use client'

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useEmpresaStore } from '@/store/empresa'

const navItems = [
  { label: 'Início', href: '/dashboard' },
  { label: 'Histórico', href: '/dashboard/history' },
  { label: 'Empresa', href: '/dashboard/empresa' },
]

export function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const { empresa } = useEmpresaStore()
  const [menuOpen, setMenuOpen] = useState(false)

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
  }

  const empresaLabel = [empresa?.nome, empresa?.porte]
    .filter(Boolean)
    .join(' · ')

  return (
    <header className="h-16 bg-navy-deep border-b border-white/10 flex items-center justify-between px-6 relative z-50 shrink-0">
      {/* Logo + nav */}
      <div className="flex items-center gap-8">
        <Link href="/dashboard" className="flex items-baseline gap-0.5">
          <span className="font-serif font-light text-[22px] text-white tracking-tight">Nina</span>
          <span className="font-sans font-light text-[13px] text-pink">.AI</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map(({ label, href }) => {
            const active = pathname === href || (href !== '/dashboard' && pathname.startsWith(href))
            return (
              <Link
                key={href}
                href={href}
                className={`relative px-3 py-2 font-sans text-[13px] transition-all rounded-md ${
                  active ? 'font-medium text-white' : 'text-white/50 hover:text-white/80'
                }`}
              >
                {label}
                {active && (
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-pink rounded-full" />
                )}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Right side */}
      <div className="hidden md:flex items-center gap-3">
        {empresaLabel ? (
          <div className="border border-white/10 bg-white/5 rounded-full px-4 py-1.5">
            <span className="font-sans text-[11px] text-white/60">{empresaLabel}</span>
          </div>
        ) : (
          <Link
            href="/dashboard/empresa"
            className="border border-pink/25 bg-pink-subtle rounded-full px-4 py-1.5 hover:bg-pink/20 transition-colors"
          >
            <span className="font-sans text-[11px] text-pink">+ Configurar empresa</span>
          </Link>
        )}
        <button
          onClick={handleSignOut}
          className="w-8 h-8 rounded-full bg-gradient-to-br from-pink to-pink-glow flex items-center justify-center hover:opacity-90 transition-opacity"
        >
          <span className="font-sans text-[11px] font-medium text-white">
            {empresa?.nome?.[0]?.toUpperCase() ?? 'N'}
          </span>
        </button>
      </div>

      {/* Mobile menu toggle */}
      <button
        className="md:hidden text-white/70 hover:text-white transition-colors"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile nav dropdown */}
      {menuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-navy-deep border-b border-white/10 md:hidden z-50">
          {navItems.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="flex items-center h-12 px-6 text-[13px] text-white/60 hover:text-white hover:bg-white/5 transition-colors"
            >
              {label}
            </Link>
          ))}
          <button
            onClick={handleSignOut}
            className="flex items-center w-full h-12 px-6 text-[13px] text-white/40 hover:text-white/60 transition-colors"
          >
            Sair
          </button>
        </div>
      )}
    </header>
  )
}
