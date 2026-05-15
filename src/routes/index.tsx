import { Link } from 'react-router-dom'
import {
  ArrowRight, Sparkles, TrendingUp, Trophy, Clock, Target, Zap,
  CheckCircle2, PlayCircle,
} from 'lucide-react'
import { phases, allModules, stats } from '@/data/roadmap'
import { ModuleCard } from '@/components/platform/ModuleCard'

function Dashboard() {
  const continueModule = allModules.find((m) => m.status === "in-progress");
  const recent = allModules.slice(0, 4);
  const completionPct = Math.round((stats.completed / stats.totalModules) * 100);

  return (
    <div className="px-4 md:px-10 py-8 md:py-12 max-w-[1400px] mx-auto">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-elevated">
        <div className="absolute inset-0 bg-mesh opacity-70" />
        <div className="absolute -top-24 -right-24 size-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 size-72 rounded-full bg-brand/20 blur-3xl" />

        <div className="relative grid md:grid-cols-5 gap-8 p-8 md:p-12">
          <div className="md:col-span-3">
            <div className="inline-flex items-center gap-2 px-3 h-7 rounded-full bg-card border border-border shadow-soft text-[11px] font-medium">
              <Sparkles className="size-3.5 text-primary" />
              Bem-vindo de volta, Engenheiro
            </div>
            <h1 className="mt-5 text-4xl md:text-5xl font-bold tracking-tight text-balance">
              Sua jornada para se tornar um <span className="text-gradient">Cloud Engineer</span> de elite.
            </h1>
            <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-xl">
              {stats.totalPhases} trilhas · {stats.totalModules} módulos · laboratórios reais com cenários enterprise.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {continueModule && (
                <Link
                  to={`/module/${continueModule.id}`}
                  className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-foreground text-background text-sm font-medium shadow-elevated hover:opacity-90 transition-opacity"
                >
                  <PlayCircle className="size-4" />
                  Continuar: {continueModule.title}
                  <ArrowRight className="size-4" />
                </Link>
              )}
              <Link
                to="/roadmap"
                className="inline-flex items-center gap-2 h-11 px-5 rounded-xl border border-border bg-card text-sm font-medium shadow-soft hover:bg-muted transition-colors"
              >
                Explorar roadmap
              </Link>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="rounded-2xl border border-border bg-surface/80 backdrop-blur p-6 shadow-soft">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-muted-foreground">Progresso geral</div>
                  <div className="mt-1 text-3xl font-bold tracking-tight">{completionPct}%</div>
                </div>
                <div className="size-14 rounded-2xl bg-hero-gradient grid place-items-center shadow-glow">
                  <TrendingUp className="size-6 text-white" />
                </div>
              </div>
              <div className="mt-4 h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-hero-gradient" style={{ width: `${completionPct}%` }} />
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                <Stat label="Concluídos" value={stats.completed} />
                <Stat label="Em curso" value={stats.inProgress} />
                <Stat label="Total" value={stats.totalModules} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick stats */}
      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard icon={Zap} label="XP esta semana" value="2.480" delta="+12%" />
        <KpiCard icon={Trophy} label="Conquistas" value="14" delta="+3 novas" />
        <KpiCard icon={Clock} label="Tempo estudado" value="38h" delta="esta semana" />
        <KpiCard icon={Target} label="Sequência atual" value="7 dias" delta="recorde: 21" />
      </section>

      {/* Trilhas */}
      <section className="mt-12">
        <SectionHeader
          title="Trilhas de aprendizado"
          subtitle="Do Linux ao Kubernetes em produção. Construído por engenheiros de plataforma."
          to="/roadmap" cta="Ver todas as trilhas"
        />
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {phases.slice(0, 6).map((p) => (
            <PhaseCard key={p.id} phase={p} />
          ))}
        </div>
      </section>

      {/* Continue */}
      <section className="mt-12">
        <SectionHeader title="Continue de onde parou" subtitle="Módulos recomendados para o seu nível." />
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {recent.map((m) => <ModuleCard key={m.id} module={m} />)}
        </div>
      </section>

      {/* Achievements teaser */}
      <section className="mt-12 rounded-3xl border border-border bg-card p-8 md:p-10 shadow-soft relative overflow-hidden">
        <div className="absolute right-0 top-0 size-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="relative grid md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-semibold tracking-tight">Conquiste badges, suba de nível, ganhe certificados.</h3>
            <p className="mt-2 text-muted-foreground max-w-2xl">
              Sistema de gamificação inspirado em Duolingo + GitHub. Mantenha sua sequência diária e desbloqueie selos exclusivos.
            </p>
          </div>
          <Link
            to="/achievements"
            className="justify-self-start md:justify-self-end inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-foreground text-background text-sm font-medium shadow-elevated"
          >
            Ver conquistas <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="text-lg font-semibold tracking-tight">{value}</div>
      <div className="text-[10px] text-muted-foreground uppercase tracking-widest">{label}</div>
    </div>
  );
}

function KpiCard({ icon: Icon, label, value, delta }: { icon: any; label: string; value: string; delta: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-soft hover:shadow-elevated hover:-translate-y-0.5 transition-all">
      <div className="flex items-center justify-between">
        <span className="size-9 rounded-xl bg-accent grid place-items-center"><Icon className="size-4 text-primary" /></span>
        <span className="text-[10px] text-success font-medium">{delta}</span>
      </div>
      <div className="mt-4 text-2xl font-bold tracking-tight">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

function SectionHeader({ title, subtitle, to, cta }: { title: string; subtitle: string; to?: string; cta?: string }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
      </div>
      {to && cta && (
        <Link to={to} className="text-sm font-medium text-primary inline-flex items-center gap-1 hover:underline">
          {cta} <ArrowRight className="size-4" />
        </Link>
      )}
    </div>
  );
}

function PhaseCard({ phase }: { phase: typeof phases[number] }) {
  const Icon = phase.icon;
  const completed = phase.modules.filter((m) => m.status === "completed").length;
  const pct = Math.round((completed / phase.modules.length) * 100);
  return (
    <Link
      to={`/phase/${phase.id}`}
      className="group relative block rounded-2xl border border-border bg-card p-6 shadow-soft hover:shadow-elevated hover:-translate-y-0.5 transition-all overflow-hidden"
    >
      <div className={`absolute -top-10 -right-10 size-32 rounded-full bg-gradient-to-br ${phase.color} blur-2xl`} />
      <div className="relative">
        <div className="flex items-center justify-between">
          <span className="size-11 rounded-xl bg-accent grid place-items-center shadow-soft">
            <Icon className="size-5 text-primary" />
          </span>
          <span className="text-[10px] font-mono text-muted-foreground">FASE {phase.number}</span>
        </div>
        <h3 className="mt-4 text-lg font-semibold tracking-tight">{phase.title}</h3>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{phase.description}</p>
        <div className="mt-5 flex items-center justify-between text-xs">
          <span className="text-muted-foreground">{phase.modules.length} módulos</span>
          <span className="font-medium">{pct}%</span>
        </div>
        <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
          <div className="h-full bg-hero-gradient" style={{ width: `${pct}%` }} />
        </div>
        <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
          Abrir trilha <ArrowRight className="size-3" />
        </div>
      </div>
    </Link>
  )
}

export default Dashboard
