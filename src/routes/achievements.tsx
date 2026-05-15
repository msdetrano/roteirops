import { Trophy, Flame, Star, Award, Zap, Crown, Target, BookCheck } from 'lucide-react'
import { stats } from '@/data/roadmap'

const badges = [
  { icon: Flame, name: "Streak Master", desc: "7 dias consecutivos estudando", earned: true, color: "from-orange-400 to-red-500" },
  { icon: BookCheck, name: "Linux Padawan", desc: "Concluiu Fundamentos Linux", earned: true, color: "from-blue-400 to-cyan-500" },
  { icon: Zap, name: "Speed Runner", desc: "5 módulos em um dia", earned: true, color: "from-amber-400 to-yellow-500" },
  { icon: Trophy, name: "Lab Hero", desc: "10 laboratórios completos", earned: true, color: "from-emerald-400 to-teal-500" },
  { icon: Star, name: "Early Adopter", desc: "Primeiros 1.000 usuários", earned: true, color: "from-violet-400 to-purple-500" },
  { icon: Target, name: "Sniper", desc: "100% em um quiz", earned: false, color: "from-pink-400 to-rose-500" },
  { icon: Award, name: "Kubernetes Pro", desc: "Concluiu trilha Kubernetes", earned: false, color: "from-indigo-400 to-blue-500" },
  { icon: Crown, name: "SRE Elite", desc: "Concluiu todas as trilhas SRE", earned: false, color: "from-fuchsia-400 to-pink-500" },
];

function AchievementsPage() {
  const earned = badges.filter((b) => b.earned).length;
  return (
    <div className="px-4 md:px-10 py-10 max-w-[1400px] mx-auto">
      <header className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">Gamificação</span>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">Suas conquistas</h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Mantenha sua sequência, desbloqueie badges e suba de nível como engenheiro.
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-muted-foreground">Nível atual</div>
              <div className="text-3xl font-bold mt-1">12 · Engineer</div>
            </div>
            <div className="size-14 rounded-2xl bg-hero-gradient grid place-items-center shadow-glow">
              <Crown className="size-6 text-white" />
            </div>
          </div>
          <div className="mt-4 text-xs text-muted-foreground">2.480 / 3.500 XP até nível 13</div>
          <div className="mt-2 h-2 rounded-full bg-muted overflow-hidden">
            <div className="h-full bg-hero-gradient" style={{ width: "70%" }} />
          </div>
        </div>
      </header>

      <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Badges", value: `${earned}/${badges.length}` },
          { label: "Módulos", value: `${stats.completed}/${stats.totalModules}` },
          { label: "Trilhas", value: `${stats.totalPhases}` },
          { label: "Streak", value: "7 dias 🔥" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
            <div className="text-xs text-muted-foreground uppercase tracking-widest">{s.label}</div>
            <div className="mt-2 text-2xl font-bold">{s.value}</div>
          </div>
        ))}
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold tracking-tight">Badges</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {badges.map((b) => {
            const Icon = b.icon;
            return (
              <div key={b.name} className={`relative rounded-2xl border border-border bg-card p-5 shadow-soft transition-all ${b.earned ? "hover:shadow-elevated hover:-translate-y-0.5" : "opacity-60"}`}>
                <div className={`size-12 rounded-2xl bg-gradient-to-br ${b.color} grid place-items-center shadow-glow`}>
                  <Icon className="size-6 text-white" />
                </div>
                <h3 className="mt-4 font-semibold">{b.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{b.desc}</p>
                <div className={`mt-3 inline-flex items-center px-2 h-6 rounded-full text-[10px] font-medium border ${b.earned ? "bg-success/10 text-success border-success/20" : "bg-muted text-muted-foreground border-border"}`}>
                  {b.earned ? "Conquistado" : "Bloqueado"}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  )
}

export default AchievementsPage
