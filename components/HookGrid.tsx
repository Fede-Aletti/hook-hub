"use client";

import type { Hook } from "@/lib/types";
import { HookCard } from "./HookCard";
import type { ViewMode } from "./FilterBar";

interface Props {
  hooks: Hook[];
  allHooks: Hook[];
  expandedId: string | null;
  onToggle: (id: string) => void;
  view: ViewMode;
}

export function HookGrid({ hooks, allHooks, expandedId, onToggle, view }: Props) {
  if (hooks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center border border-dashed border-[var(--rule-strong)] py-24 text-center">
        <p className="display text-[40px] leading-none text-[var(--ink)]">
          No matches.
        </p>
        <p className="mono mt-3 text-[11px] uppercase tracking-[0.22em] text-[var(--ink-faint)]">
          adjust filters · or clear search
        </p>
      </div>
    );
  }

  function relatedFor(hook: Hook): Hook[] {
    return allHooks
      .filter((h) => h.id !== hook.id && (h.category === hook.category || h.event === hook.event))
      .slice(0, 3);
  }

  if (view === "compact") {
    return (
      <div className="border-t border-[var(--rule)]">
        {hooks.map((hook, i) => (
          <HookCard
            key={hook.id}
            hook={hook}
            index={i}
            expanded={expandedId === hook.id}
            onToggle={() => onToggle(hook.id)}
            view="compact"
            related={relatedFor(hook)}
            onSelect={onToggle}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-px bg-[var(--rule)] sm:grid-cols-2 lg:grid-cols-3">
      {hooks.map((hook, i) => (
        <HookCard
          key={hook.id}
          hook={hook}
          index={i}
          expanded={expandedId === hook.id}
          onToggle={() => onToggle(hook.id)}
          view="comfortable"
          related={relatedFor(hook)}
          onSelect={onToggle}
        />
      ))}
    </div>
  );
}
