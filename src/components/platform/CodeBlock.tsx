import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

export function CodeBlock({
  code, lang = "bash", filename,
}: { code: string; lang?: string; filename?: string }) {
  const [copied, setCopied] = useState(false);
  const lines = code.replace(/\n$/, "").split("\n");
  return (
    <div className="rounded-xl border border-border bg-[oklch(0.985_0.005_260)] overflow-hidden shadow-soft">
      <div className="flex items-center justify-between px-4 h-9 border-b border-border bg-surface">
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
          <span className="size-2 rounded-full bg-[oklch(0.78_0.16_25)]" />
          <span className="size-2 rounded-full bg-[oklch(0.85_0.16_75)]" />
          <span className="size-2 rounded-full bg-[oklch(0.78_0.16_155)]" />
          <span className="ml-2 font-mono">{filename ?? lang}</span>
        </div>
        <button
          onClick={() => {
            navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          }}
          className="inline-flex items-center gap-1.5 px-2 h-6 rounded-md text-[11px] text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        >
          {copied ? <Check className="size-3 text-success" /> : <Copy className="size-3" />}
          {copied ? "Copiado" : "Copiar"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed font-mono">
        {lines.map((l, i) => (
          <div key={i} className="flex">
            <span className="select-none w-8 text-right pr-3 text-muted-foreground/60">{i + 1}</span>
            <code className={cn("text-foreground/90")}>{l || " "}</code>
          </div>
        ))}
      </pre>
    </div>
  );
}
