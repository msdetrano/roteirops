import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-surface mt-16">
      <div className="px-6 md:px-10 py-10 grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="size-7 rounded-lg bg-hero-gradient grid place-items-center">
              <Sparkles className="size-3.5 text-white" />
            </div>
            <span className="font-semibold tracking-tight">Roadmap.io</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-xs">
            A plataforma premium para engenheiros de plataforma, SRE e Cloud que querem aprender com profundidade.
          </p>
        </div>
        <FooterCol title="Plataforma" items={[
          { to: "/", label: "Dashboard" },
          { to: "/roadmap", label: "Roadmap" },
          { to: "/labs", label: "Laboratórios" },
          { to: "/achievements", label: "Conquistas" },
        ]} />
        <FooterCol title="Trilhas" items={[
          { to: "/phase/linux-fundamentals", label: "Linux" },
          { to: "/phase/kubernetes", label: "Kubernetes" },
          { to: "/phase/cloud", label: "Cloud" },
          { to: "/phase/windows", label: "Windows Server" },
        ]} />
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Contato</div>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>hello@roadmap.io</li>
            <li>São Paulo · Brasil</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 px-6 md:px-10 py-5 flex flex-col sm:flex-row gap-2 justify-between text-xs text-muted-foreground">
        <span>© {new Date().getFullYear()} Roadmap.io — Todos os direitos reservados.</span>
        <span>Construído com TanStack Start · TailwindCSS</span>
      </div>
    </footer>
  );
}

function FooterCol({
  title, items,
}: { title: string; items: { to: string; label: string }[] }) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{title}</div>
      <ul className="mt-3 space-y-2 text-sm">
        {items.map((it) => (
          <li key={it.to}>
            <Link to={it.to} className="text-foreground/70 hover:text-foreground transition-colors">
              {it.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
