import type { HookEvent } from "@/lib/types";

export function EventBadge({ event, matcher }: { event: HookEvent; matcher?: string }) {
  return (
    <span className="mono inline-flex items-center gap-1 border border-[var(--rule-strong)] bg-[var(--bg-elev)] px-1.5 py-[2px] text-[10.5px] text-[var(--ink-mute)]">
      <span className="text-[var(--ink-faint)]">on:</span>
      <span className="text-[var(--ink)]">{event}</span>
      {matcher ? (
        <>
          <span className="text-[var(--ink-faint)]">·</span>
          <span className="text-[var(--acid)]">{matcher}</span>
        </>
      ) : null}
    </span>
  );
}
