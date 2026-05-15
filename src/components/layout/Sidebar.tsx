import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import {
  LayoutDashboard, Map, FlaskConical, Trophy, Search, Sparkles,
  ChevronLeft, ChevronRight, BookOpen, Github,
} from "lucide-react";
import { phases } from "@/data/roadmap";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/roadmap", label: "Roadmap", icon: Map },
  { to: "/labs", label: "Laboratórios", icon: FlaskConical },
  { to: "/achievements", label: "Conquistas", icon: Trophy },
  { to: "/search", label: "Buscar", icon: Search },
] as const;

export function Sidebar({
  open, onClose,
}: { open: boolean; onClose: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [phasesOpen, setPhasesOpen] = useState(true);

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-foreground/10 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={cn(
          "fixed md:sticky top-0 left-0 z-40 h-screen w-72 shrink-0",
          "glass-strong border-r border-border/60",
          "transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="flex h-full flex-col">
          <Link
            to="/"
            onClick={onClose}
            className="flex items-center gap-2.5 px-6 h-16 border-b border-border/60"
          >
            <div className="relative">
              <div className="size-8 rounded-xl bg-hero-gradient shadow-glow grid place-items-center">
                <Sparkles className="size-4 text-white" />
              </div>
            </div>
            <div>
              <div className="text-sm font-semibold tracking-tight">Roadmap.io</div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">DevOps · SRE · Cloud</div>
            </div>
          </Link>

          <nav className="flex-1 overflow-y-auto scrollbar-thin px-3 py-4 space-y-1">
            <div className="px-3 pb-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              Geral
            </div>
            {navItems.map((it) => {
              const active =
                it.to === "/" ? pathname === "/" : pathname.startsWith(it.to);
              return (
                <Link
                  key={it.to}
                  to={it.to}
                  onClick={onClose}
                  className={cn(
                    "group flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all",
                    active
                      ? "bg-accent text-accent-foreground shadow-soft"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <it.icon className={cn("size-4", active && "text-primary")} />
                  <span>{it.label}</span>
                  {active && (
                    <span className="ml-auto size-1.5 rounded-full bg-primary" />
                  )}
                </Link>
              );
            })}

            <div className="pt-5">
              <button
                onClick={() => setPhasesOpen((v) => !v)}
                className="w-full flex items-center justify-between px-3 pb-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground hover:text-foreground"
              >
                <span>Trilhas ({phases.length})</span>
                {phasesOpen ? <ChevronLeft className="size-3 rotate-90" /> : <ChevronRight className="size-3" />}
              </button>
              {phasesOpen && (
                <div className="space-y-0.5 mt-1">
                  {phases.map((p) => {
                    const active = pathname === `/phase/${p.id}` || pathname.startsWith(`/phase/${p.id}/`);
                    return (
                      <Link
                        key={p.id}
                        to="/phase/$phaseId"
                        params={{ phaseId: p.id }}
                        onClick={onClose}
                        className={cn(
                          "group flex items-center gap-3 px-3 py-1.5 rounded-lg text-sm transition-all",
                          active
                            ? "bg-accent text-foreground"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                        )}
                      >
                        <span className="grid place-items-center size-6 rounded-md bg-muted text-[10px] font-semibold text-foreground/70 group-hover:bg-background">
                          {p.number}
                        </span>
                        <span className="truncate">{p.title}</span>
                        <span className="ml-auto text-[10px] text-muted-foreground/70">{p.modules.length}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          <div className="p-3 border-t border-border/60">
            <div className="rounded-xl border border-border bg-soft-gradient p-4">
              <div className="flex items-center gap-2 text-xs font-medium text-foreground">
                <BookOpen className="size-3.5 text-primary" />
                Continue estudando
              </div>
              <p className="mt-1 text-[11px] text-muted-foreground leading-relaxed">
                Você está a 3 módulos de concluir Fundamentos Linux.
              </p>
              <Link
                to="/module/$moduleId"
                params={{ moduleId: "permissions" }}
                className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline"
              >
                Retomar →
              </Link>
            </div>
            <a
              href="https://github.com"
              target="_blank" rel="noreferrer"
              className="mt-2 flex items-center gap-2 px-3 py-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="size-3.5" />
              Star no GitHub
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
