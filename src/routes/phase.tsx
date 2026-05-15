import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Target } from 'lucide-react'
import { getPhase, allModules } from '@/data/roadmap'
import { ModuleCard } from '@/components/platform/ModuleCard'

export default function PhasePage() {
  const { phaseId } = useParams<{ phaseId: string }>()

  const phase = phaseId ? getPhase(phaseId) : null
  const phaseModules = phase ? allModules.filter((m) => m.phaseId === phase.id) : []

  if (!phase) {
    return <div className="p-10 text-center text-muted-foreground">Fase não encontrada.</div>
  }

  return (
    <div className="px-4 md:px-10 py-8 md:py-10 max-w-[1400px] mx-auto">
      <Link
        to="/roadmap"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
      >
        <ArrowLeft className="size-4" />
        Voltar ao Roadmap
      </Link>

      <div className="mb-12">
        <div className="flex items-start gap-4">
          <div className="flex items-center justify-center size-16 rounded-lg bg-primary/10 border border-primary/20">
            <Target className="size-8 text-primary" />
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-bold">{phase.title}</h1>
            <p className="mt-3 text-muted-foreground text-lg max-w-3xl">{phase.description}</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6">Módulos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {phaseModules.map((m) => (
            <ModuleCard key={m.id} module={m} />
          ))}
        </div>
      </div>
    </div>
  )
}
