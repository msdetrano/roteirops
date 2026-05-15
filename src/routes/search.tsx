import { Link } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { Search as SearchIcon, ArrowRight } from 'lucide-react'
import { allModules, phases } from '@/data/roadmap'

function SearchPage() {
  const [q, setQ] = useState("");
  const norm = q.trim().toLowerCase();
  const results = useMemo(() => {
    if (!norm) return allModules.slice(0, 12);
    return allModules.filter((m) =>
      m.title.toLowerCase().includes(norm) ||
      m.description.toLowerCase().includes(norm) ||
      (m as any).phaseTitle?.toLowerCase().includes(norm) ||
      m.topics.some((t) => t.toLowerCase().includes(norm))
    ).slice(0, 30);
  }, [norm]);

  return (
    <div className="px-4 md:px-10 py-10 max-w-[1100px] mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Busca instantânea</h1>
      <p className="mt-2 text-muted-foreground">Procure por módulos, trilhas, comandos ou laboratórios.</p>

      <div className="mt-6 flex items-center gap-3 px-4 h-14 rounded-2xl border border-border bg-card shadow-soft focus-within:shadow-glow transition-shadow">
        <SearchIcon className="size-5 text-muted-foreground" />
        <input
          autoFocus
          value={q} onChange={(e) => setQ(e.target.value)}
          placeholder="Ex: kubernetes, ssh, troubleshooting…"
          className="flex-1 bg-transparent outline-none text-base"
        />
        {q && (
          <button onClick={() => setQ("")} className="text-xs text-muted-foreground hover:text-foreground">Limpar</button>
        )}
      </div>

      {!norm && (
        <div className="mt-6 flex flex-wrap gap-2">
          {phases.slice(0, 8).map((p) => (
            <button
              key={p.id} onClick={() => setQ(p.title)}
              className="px-3 h-8 rounded-full bg-muted text-xs hover:bg-accent transition-colors"
            >
              {p.title}
            </button>
          ))}
        </div>
      )}

      <div className="mt-8 space-y-2">
        {results.length === 0 && (
          <div className="text-sm text-muted-foreground">Nenhum resultado para "{q}".</div>
        )}
        {results.map((m) => (
          <Link
            key={m.id} to="/module/$moduleId" params={{ moduleId: m.id }}
            className="group flex items-center gap-4 p-4 rounded-2xl border border-border bg-card shadow-soft hover:shadow-elevated hover:border-primary/30 transition-all"
          >
            <div className="min-w-0 flex-1">
              <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{(m as any).phaseTitle}</div>
              <div className="mt-0.5 font-semibold truncate">{m.title}</div>
              <div className="text-xs text-muted-foreground truncate">{m.description}</div>
            </div>
            <ArrowRight className="size-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SearchPage
