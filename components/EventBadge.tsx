import type { HookEvent } from "@/lib/types";

export function EventBadge({ event }: { event: HookEvent }) {
  return (
    <span className="inline-flex items-center rounded-full bg-zinc-800 px-2 py-0.5 text-xs font-mono text-zinc-300 ring-1 ring-inset ring-zinc-700">
      {event}
    </span>
  );
}
