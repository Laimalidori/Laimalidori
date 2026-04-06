import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format, isToday, isYesterday, isSameYear, formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date

  if (isToday(d)) {
    return `hoje às ${format(d, 'HH:mm', { locale: ptBR })}`
  }
  if (isYesterday(d)) {
    return `ontem às ${format(d, 'HH:mm', { locale: ptBR })}`
  }
  if (isSameYear(d, new Date())) {
    return format(d, "d 'de' MMMM", { locale: ptBR })
  }
  return format(d, "d 'de' MMMM 'de' yyyy", { locale: ptBR })
}

export function formatRelative(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return formatDistanceToNow(d, { locale: ptBR, addSuffix: true })
}

export function groupByMonth<T extends { created_at: string }>(
  items: T[]
): Record<string, T[]> {
  const groups: Record<string, T[]> = {}

  for (const item of items) {
    const d = new Date(item.created_at)
    const key = format(d, 'MMMM yyyy', { locale: ptBR })
    if (!groups[key]) groups[key] = []
    groups[key].push(item)
  }

  return groups
}

export function detectArtifact(content: string): boolean {
  const patterns = [
    /##\s+business case/i,
    /##\s+plano de projeto/i,
    /##\s+apresenta[çc][aã]o/i,
    /##\s+pesquisa de mercado/i,
    /roi[\s:]/i,
    /investimento[\s:]/i,
    /milestone/i,
  ]
  return patterns.some((p) => p.test(content))
}
