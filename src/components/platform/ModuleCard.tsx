import { Link } from "@tanstack/react-router";
import { Clock, Lock, CheckCircle2, PlayCircle, ArrowRight } from "lucide-react";
import type { Module } from "@/data/roadmap";
import { cn } from "@/lib/utils";

const statusBadge = {
  completed: { icon: CheckCircle2, label: "Concluído", cls: "bg-success/10 text-success border-success/20" },
  "in-progress": { icon: PlayCircle, label: "Em andamento", cls: "bg-primary/10 text-primary border-primary/20" },
  available: { icon: PlayCircle, label: "Disponível", cls: "bg-muted text-foreground/70 border-border" },
  locked: { icon: Lock, label: "Bloqueado", cls: "bg-muted text-muted-foreground border-border" },
} as const;

export function ModuleCard({ module }: { module: Module }) {
  const s = statusBadge[module.status];
  const Icon = s.icon;
  return (
    <Link
      to="/module/$moduleId"
      params={{ moduleId: module.id }}
      className={cn(
        "group relative block rounded-2xl border border-border bg-card p-5",
        "shadow-soft hover:shadow-elevated transition-all duration-300",
        "hover:-translate-y-0.5 hover:border-primary/30"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            <span>{module.difficulty}</span>
            <span className="size-0.5 rounded-full bg-muted-foreground/40" />
            <Clock className="size-3" />
            <span>{module.duration}</span>
          </div>
          <h3 className="mt-2 text-base font-semibold tracking-tight text-foreground truncate">
            {module.title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{module.description}</p>
        </div>
        <span className={cn("shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] font-medium", s.cls)}>
          <Icon className="size-3" />
          {s.label}
        </span>
      </div>
      <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
        <span>{module.topics.length} tópicos · Lab incluso</span>
        <span className="inline-flex items-center gap-1 text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
          Abrir <ArrowRight className="size-3" />
        </span>
      </div>
    </Link>
  );
}
