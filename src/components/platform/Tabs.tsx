import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface TabItem { id: string; label: string; icon?: ReactNode; content: ReactNode }

export function Tabs({ items, defaultId }: { items: TabItem[]; defaultId?: string }) {
  const [active, setActive] = useState(defaultId ?? items[0]?.id);
  const current = items.find((i) => i.id === active) ?? items[0];
  return (
    <div>
      <div className="inline-flex items-center gap-1 p-1 rounded-xl border border-border bg-muted/40">
        {items.map((it) => {
          const isActive = it.id === active;
          return (
            <button
              key={it.id}
              onClick={() => setActive(it.id)}
              className={cn(
                "relative inline-flex items-center gap-1.5 h-9 px-3.5 rounded-lg text-sm font-medium transition-all",
                isActive
                  ? "bg-card text-foreground shadow-soft"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {it.icon}
              {it.label}
            </button>
          );
        })}
      </div>
      <div className="mt-6 animate-in fade-in duration-300">{current?.content}</div>
    </div>
  );
}
