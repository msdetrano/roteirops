import { Link } from 'react-router-dom'
import { FlaskConical, ArrowRight, Clock } from 'lucide-react'
import { allModules, phases } from '@/data/roadmap'

function LabsPage() {
  return (
    <div className="px-4 md:px-10 py-10 max-w-[1400px] mx-auto">
      <header className="max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">Hands-on real</span>
        <h1 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">Laboratórios práticos</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          {allModules.length} laboratórios com comandos reais, cenários enterprise e checklist de validação.
        </p>
      </header>

      <div className="mt-10 space-y-10">
        {phases.map((p) => (
          <section key={p.id}>
            <div className="flex items-end justify-between gap-3 flex-wrap">
              <div>
                <div className="text-xs font-mono text-muted-foreground">FASE {p.number.toString().padStart(2, "0")}</div>
                <h2 className="mt-1 text-2xl font-semibold tracking-tight">{p.title}</h2>
              </div>
              <Link to={`/phase/${p.id}`} className="text-sm text-primary inline-flex items-center gap-1 hover:underline">
                Ver trilha <ArrowRight className="size-3.5" />
              </Link>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {p.modules.slice(0, 6).map((m) => (
                <Link
                  key={m.id} to="/module/$moduleId" params={{ moduleId: m.id }}
                  className="group rounded-2xl border border-border bg-card p-5 shadow-soft hover:shadow-elevated hover:-translate-y-0.5 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="size-9 rounded-xl bg-accent grid place-items-center"><FlaskConical className="size-4 text-primary" /></span>
                    <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground"><Clock className="size-3" />{m.duration}</span>
                  </div>
                  <h3 className="mt-4 font-semibold tracking-tight">{m.lab?.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{m.lab?.steps[0]}</p>
                  <div className="mt-3 text-xs text-primary inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Iniciar lab <ArrowRight className="size-3" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

export default LabsPage
