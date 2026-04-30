import type { Hook } from "@/lib/types";
import { CategoryBadge } from "./CategoryBadge";
import { EventBadge } from "./EventBadge";
import { CopyButton } from "./CopyButton";

export function HookCard({ hook }: { hook: Hook }) {
  return (
    <article className="flex flex-col gap-4 rounded-xl border border-zinc-800 bg-[#111] p-5 transition-colors hover:border-zinc-700">
      <div className="flex flex-wrap items-center gap-2">
        <CategoryBadge category={hook.category} />
        <EventBadge event={hook.event} />
      </div>

      <div className="flex-1">
        <h2 className="text-base font-semibold text-zinc-100">{hook.name}</h2>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-zinc-400">
          {hook.description}
        </p>
      </div>

      <div className="flex items-center gap-2 text-xs text-zinc-500">
        <img
          src={`https://github.com/${hook.author}.png?size=20`}
          alt={hook.author}
          width={20}
          height={20}
          className="rounded-full"
        />
        <span className="font-medium text-zinc-400">{hook.author}</span>

        <span className="ml-auto flex items-center gap-1">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
            <path d="M6 1l1.39 2.82 3.11.45-2.25 2.19.53 3.09L6 8l-2.78 1.55.53-3.09L1.5 4.27l3.11-.45L6 1z" />
          </svg>
          {hook.stars.toLocaleString()}
        </span>

        <span className="rounded bg-zinc-800 px-1.5 py-0.5 font-mono text-zinc-400">
          {hook.language}
        </span>
      </div>

      <div className="flex items-center gap-3 border-t border-zinc-800 pt-4">
        <CopyButton snippet={hook.snippet} />
        <a
          href={hook.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-zinc-400 underline-offset-2 hover:text-zinc-200 hover:underline"
        >
          View Repo →
        </a>
      </div>
    </article>
  );
}
