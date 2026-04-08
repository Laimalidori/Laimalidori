'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Clock, Building2, LayoutGrid } from 'lucide-react'

const navItems = [
  { href: '/dashboard',         label: 'Início',   icon: Home },
  { href: '/dashboard/history', label: 'Histórico', icon: Clock },
  { href: '/dashboard/empresa', label: 'Empresa',  icon: Building2 },
  { href: '/dashboard/pillar/estrategia', label: 'Módulos', icon: LayoutGrid },
]

export function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-navy-deep border-t border-white/10 flex items-stretch">
      {navItems.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href || (href !== '/dashboard' && pathname.startsWith(href))
        return (
          <Link
            key={href}
            href={href}
            className={`flex-1 flex flex-col items-center justify-center gap-1 py-2.5 transition-colors ${
              isActive ? 'text-pink' : 'text-white/30 hover:text-white/55'
            }`}
          >
            <Icon size={18} strokeWidth={1.5} />
            <span className="text-[10px] font-medium">{label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
