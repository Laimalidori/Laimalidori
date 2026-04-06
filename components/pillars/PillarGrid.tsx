import { PILLARS } from '@/lib/agents/pillars'
import { PillarCard } from './PillarCard'

export function PillarGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {PILLARS.map((pillar) => (
        <PillarCard key={pillar.id} pillar={pillar} />
      ))}
    </div>
  )
}
