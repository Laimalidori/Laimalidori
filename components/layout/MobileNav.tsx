'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Clock, Building2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/dashboard', label: 'Início', icon: Home },
  { href: '/dashboard/history', label: 'Histórico', icon: Clock },
  { href: '/dashboard/empresa', label: 'Empresa', icon: Building2 },
]

export function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface border-t border-[var(--border)] flex items-stretch">
      {navItems.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href || (href !== '/dashboard' && pathname.startsWith(href))

        return (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex-1 flex flex-col items-center justify-center gap-1 py-2.5 transition-colors',
              isActive ? 'text-accent' : 'text-text-disabled hover:text-text-tertiary'
            )}
          >
            <Icon size={18} strokeWidth={1.5} />
            <span className="text-[10px] font-medium">{label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
