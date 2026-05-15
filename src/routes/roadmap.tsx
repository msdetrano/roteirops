import { Link } from 'react-router-dom'
import { phases } from '@/data/roadmap'
import { ArrowRight, CheckCircle2, Circle, PlayCircle } from 'lucide-react'

function RoadmapPage() {
  return (
    <div className="px-4 md:px-10 py-10 md:py-14 max-w-[1400px] mx-auto">
      <header className="max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">Roadmap completo</span>
        <h1 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight text-balance">
          De engenheiro júnior a líder de plataforma.
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          {phases.length} fases conectadas, da base Linux até observabilidade, SRE e administração Windows enterprise.
        </p>
      </header>

      <div className="relative mt-14">
        <div className="absolute left-6 md:left-10 top-3 bottom-3 w-px bg-border" />
        <ol className="space-y-10">
          {phases.map((p, idx) => {
            const Icon = p.icon;
            const completed = p.modules.filter((m) => m.status === "completed").length;
            const inProg = p.modules.some((m) => m.status === "in-progress");
            const pct = Math.round((completed / p.modules.length) * 100);
            const StatusIcon = pct === 100 ? CheckCircle2 : inProg ? PlayCircle : Circle;
            return (
              <li key={p.id} className="relative pl-16 md:pl-24">
                <div className="absolute left-0 md:left-4 top-1.5 grid place-items-center size-12 rounded-2xl bg-card border border-border shadow-soft">
                  <Icon className="size-5 text-primary" />
                </div>
                <Link
                  to={`/phase/${p.id}`}
                  className="group block rounded-2xl border border-border bg-card p-6 md:p-7 shadow-soft hover:shadow-elevated hover:border-primary/30 transition-all"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="font-mono">FASE {p.number.toString().padStart(2, "0")}</span>
                        <span className="size-1 rounded-full bg-muted-foreground/40" />
                        <span>{p.modules.length} módulos</span>
                      </div>
                      <h2 className="mt-2 text-xl md:text-2xl font-semibold tracking-tight">{p.title}</h2>
                      <p className="mt-1 text-sm md:text-base text-muted-foreground max-w-2xl">{p.subtitle}</p>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-medium">
                      <StatusIcon className={`size-4 ${pct === 100 ? "text-success" : inProg ? "text-primary" : "text-muted-foreground"}`} />
                      <span>{pct}% concluído</span>
                    </div>
                  </div>

                  <div className="mt-5 h-1.5 rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-hero-gradient transition-all" style={{ width: `${pct}%` }} />
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.modules.slice(0, 6).map((m) => (
                      <span key={m.id} className="px-2.5 h-7 inline-flex items-center rounded-full bg-muted text-xs text-foreground/70">
                        {m.title}
                      </span>
                    ))}
                    {p.modules.length > 6 && (
                      <span className="px-2.5 h-7 inline-flex items-center rounded-full bg-accent text-xs text-accent-foreground font-medium">
                        +{p.modules.length - 6} mais
                      </span>
                    )}
                  </div>

                  <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                    Explorar trilha <ArrowRight className="size-4" />
                  </div>
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  )
}

export default RoadmapPage
