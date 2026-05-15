import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function Checklist({ items }: { items: string[] }) {
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const done = Object.values(checked).filter(Boolean).length;
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">Progresso do checklist</span>
        <span className="text-muted-foreground">{done}/{items.length}</span>
      </div>
      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full bg-hero-gradient transition-all duration-500"
          style={{ width: `${(done / items.length) * 100}%` }}
        />
      </div>
      <ul className="mt-4 space-y-2">
        {items.map((it, i) => {
          const isChecked = !!checked[i];
          return (
            <li key={i}>
              <button
                onClick={() => setChecked((c) => ({ ...c, [i]: !c[i] }))}
                className={cn(
                  "w-full text-left flex items-center gap-3 p-3 rounded-xl border transition-all",
                  isChecked
                    ? "border-success/30 bg-success/5"
                    : "border-border bg-card hover:bg-muted/40"
                )}
              >
                <span className={cn(
                  "grid place-items-center size-5 rounded-md border transition-colors",
                  isChecked ? "bg-success border-success text-success-foreground" : "border-border"
                )}>
                  {isChecked && <Check className="size-3" />}
                </span>
                <span className={cn("text-sm", isChecked && "line-through text-muted-foreground")}>
                  {it}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
