import { Link } from "react-router-dom";
import { Menu, Search, Bell, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header({ onOpenSidebar }: { onOpenSidebar: () => void }) {
  return (
    <header className="sticky top-0 z-20 glass border-b border-border/60">
      <div className="flex items-center gap-3 h-16 px-4 md:px-8">
        <Button
          variant="ghost" size="icon" className="md:hidden"
          onClick={onOpenSidebar} aria-label="Abrir menu"
        >
          <Menu className="size-5" />
        </Button>

        <Link
          to="/search"
          className="flex-1 max-w-xl flex items-center gap-2 px-3.5 h-9 rounded-lg border border-border bg-surface hover:bg-muted/60 transition-colors text-sm text-muted-foreground"
        >
          <Search className="size-4" />
          <span>Buscar módulos, comandos, labs…</span>
          <kbd className="ml-auto hidden sm:inline-flex items-center gap-1 px-1.5 h-5 rounded border border-border bg-background text-[10px] font-mono text-muted-foreground">
            ⌘K
          </kbd>
        </Link>

        <div className="ml-auto flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 h-8 rounded-full bg-warning/10 text-warning-foreground border border-warning/20 text-xs font-medium">
            <Flame className="size-3.5 text-warning" />
            <span>7 dias</span>
          </div>
          <Button variant="ghost" size="icon" className="relative" aria-label="Notificações">
            <Bell className="size-4.5" />
            <span className="absolute top-2 right-2 size-1.5 rounded-full bg-primary" />
          </Button>
          <div className="size-8 rounded-full bg-hero-gradient shadow-soft grid place-items-center text-white text-xs font-semibold">
            DV
          </div>
        </div>
      </div>
    </header>
  );
}
