import type { HookCategory } from "@/lib/types";

const styles: Record<HookCategory, string> = {
  security: "bg-rose-500/15 text-rose-400 ring-rose-500/20",
  formatting: "bg-sky-500/15 text-sky-400 ring-sky-500/20",
  logging: "bg-amber-500/15 text-amber-400 ring-amber-500/20",
  environment: "bg-emerald-500/15 text-emerald-400 ring-emerald-500/20",
  "ci-cd": "bg-violet-500/15 text-violet-400 ring-violet-500/20",
  productivity: "bg-orange-500/15 text-orange-400 ring-orange-500/20",
  "input-sanitization": "bg-fuchsia-500/15 text-fuchsia-400 ring-fuchsia-500/20",
  other: "bg-zinc-500/15 text-zinc-400 ring-zinc-500/20",
};

export function CategoryBadge({ category }: { category: HookCategory }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${styles[category]}`}
    >
      {category}
    </span>
  );
}
