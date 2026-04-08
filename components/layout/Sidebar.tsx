'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Users, Sparkles, Target, TrendingUp, Heart, BarChart2, Shield,
  FileText, Search, Presentation, MessageCircle, ChevronRight,
} from 'lucide-react'

const MODULES = [
  { num: '01', name: 'Workforce Planning', icon: Users,   href: '/dashboard/pillar/estrategia', pillar: 'estrategia' },
  { num: '02', name: 'Atração',            icon: Sparkles, href: '/dashboard/pillar/atracao',    pillar: 'atracao' },
  { num: '03', name: 'Performance',        icon: Target,   href: '/dashboard/pillar/performance', pillar: 'performance' },
  { num: '04', name: 'Liderança',          icon: TrendingUp, href: '/dashboard/pillar/lideranca', pillar: 'lideranca' },
  { num: '05', name: 'Cultura',            icon: Heart,    href: '/dashboard/pillar/cultura',    pillar: 'cultura' },
  { num: '06', name: 'Dados & Analytics',  icon: BarChart2, href: '/dashboard/pillar/dados',     pillar: 'dados' },
]

const TOOLS = [
  { name: 'Business Case',   icon: FileText,      href: '/dashboard?tool=business-case' },
  { name: 'Pesquisa',        icon: Search,        href: '/dashboard?tool=pesquisa' },
  { name: 'Apresentações',   icon: Presentation,  href: '/dashboard?tool=apresentacoes' },
  { name: 'Plano de Ação',   icon: Shield,        href: '/dashboard?tool=plano-acao' },
]

export function Sidebar() {
  const pathname = usePathname()

  function isActive(href: string, pillar: string) {
    return pathname.startsWith(`/dashboard/pillar/${pillar}`) ||
           pathname.startsWith(`/dashboard/modulo/workforce-planning`) && pillar === 'estrategia' && pathname.includes('workforce')
  }

  return (
    <aside className="hidden lg:flex flex-col w-[240px] bg-navy-deep border-r border-white/8 shrink-0 min-h-[calc(100vh-64px)]">
      {/* Módulos */}
      <div className="px-3 pt-5 pb-2 space-y-0.5">
        <p className="px-3 mb-3 font-sans text-[10px] font-medium tracking-widest uppercase text-white/25">
          Módulos
        </p>
        {MODULES.map((mod) => {
          const active = isActive(mod.href, mod.pillar)
          return (
            <Link
              key={mod.num}
              href={mod.href}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group border-l-2 ${
                active
                  ? 'bg-white/10 border-pink'
                  : 'border-transparent hover:bg-white/5'
              }`}
            >
              <mod.icon
                size={15}
                strokeWidth={1.5}
                className={`shrink-0 transition-colors ${
                  active ? 'text-pink' : 'text-white/30 group-hover:text-white/55'
                }`}
              />
              <div className="flex items-center gap-2 min-w-0">
                <span className="font-mono text-[10px] text-white/25 shrink-0">{mod.num}</span>
                <span
                  className={`font-sans text-[13px] truncate transition-colors ${
                    active ? 'font-medium text-white' : 'text-white/50 group-hover:text-white/75'
                  }`}
                >
                  {mod.name}
                </span>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Divider */}
      <div className="mx-4 my-3 h-px bg-white/8" />

      {/* Ferramentas */}
      <div className="px-3 space-y-0.5">
        <p className="px-3 mb-2 font-sans text-[10px] font-medium tracking-widest uppercase text-white/25">
          Ferramentas
        </p>
        {TOOLS.map((tool) => (
          <Link
            key={tool.name}
            href={tool.href}
            className="flex items-center gap-2.5 px-3 py-2 rounded-md font-sans text-[12px] text-white/40 hover:text-pink hover:bg-white/5 transition-all group"
          >
            <tool.icon size={13} strokeWidth={1.5} className="shrink-0" />
            <span>{tool.name}</span>
          </Link>
        ))}
      </div>

      {/* Advisor CTA */}
      <div className="mt-auto px-4 pb-6 pt-4">
        <Link
          href="/dashboard"
          className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-gradient-to-r from-pink/12 to-transparent border border-pink/20 text-pink font-sans text-[12px] hover:from-pink/20 transition-all"
        >
          <MessageCircle size={14} strokeWidth={1.5} className="shrink-0" />
          <span>Chat com Nina</span>
          <ChevronRight size={12} className="ml-auto opacity-50" />
        </Link>
      </div>
    </aside>
  )
}
