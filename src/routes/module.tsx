import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, BookOpen, FlaskConical, ListChecks, Wrench, Lightbulb, Clock, BarChart3 } from 'lucide-react'
import { allModules, getModule, getPhase } from '@/data/roadmap'
import { Tabs } from '@/components/platform/Tabs'
import { CodeBlock } from '@/components/platform/CodeBlock'
import { Checklist } from '@/components/platform/Checklist'

export default function ModulePage() {
  const { moduleId } = useParams<{ moduleId: string }>()
  const navigate = useNavigate()

  const m = moduleId ? getModule(moduleId) : null
  const phase = m ? getPhase(m.phaseId) : null
  const idx = m ? allModules.findIndex((x) => x.id === m.id) : -1
  const prev = idx > 0 ? allModules[idx - 1] : null
  const next = idx < allModules.length - 1 ? allModules[idx + 1] : null

  if (!m) {
    return <div className="p-10 text-center text-muted-foreground">Módulo não encontrado.</div>
  }

  return (
    <div className="px-4 md:px-10 py-8 md:py-10 max-w-[1200px] mx-auto">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link to="/roadmap" className="hover:text-foreground">Roadmap</Link>
        <span>/</span>
        {phase && (
          <>
            <Link to={`/phase/${phase.id}`} className="hover:text-foreground">{phase.title}</Link>
            <span>/</span>
          </>
        )}
        <span className="text-foreground">{m.title}</span>
      </div>

      <div className="mt-8 flex items-start justify-between">
        <div className="flex-1">
          <h1 className="text-4xl font-bold">{m.title}</h1>
          <p className="mt-3 text-muted-foreground text-lg max-w-3xl">{m.description}</p>

          <div className="mt-8 flex flex-wrap gap-4">
            {m.duration && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/30 border border-secondary">
                <Clock className="size-4" />
                <span className="text-sm">{m.duration}</span>
              </div>
            )}
            {m.difficulty && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/30 border border-secondary">
                <BarChart3 className="size-4" />
                <span className="text-sm capitalize">{m.difficulty}</span>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="ml-4 p-2 rounded-lg hover:bg-secondary transition-colors"
        >
          <ArrowLeft className="size-6" />
        </button>
      </div>

      {m.sections && m.sections.length > 0 && (
        <Tabs
          defaultValue={m.sections[0].id}
          sections={m.sections}
        />
      )}

      {m.checklist && m.checklist.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <ListChecks className="size-6" />
            Checklist
          </h2>
          <Checklist items={m.checklist} />
        </div>
      )}

      {m.labs && m.labs.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <FlaskConical className="size-6" />
            Laboratórios
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {m.labs.map((lab) => (
              <div key={lab.id} className="p-4 border border-border rounded-lg hover:bg-secondary/30 transition-colors cursor-pointer">
                <h3 className="font-semibold">{lab.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{lab.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {(prev || next) && (
        <div className="mt-12 flex justify-between pt-8 border-t border-border">
          {prev ? (
            <Link
              to={`/module/${prev.id}`}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/30 hover:bg-secondary transition-colors"
            >
              <ArrowLeft className="size-4" />
              {prev.title}
            </Link>
          ) : (
            <div />
          )}
          {next && (
            <Link
              to={`/module/${next.id}`}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/30 hover:bg-secondary transition-colors"
            >
              {next.title}
              <ArrowLeft className="size-4 rotate-180" />
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
