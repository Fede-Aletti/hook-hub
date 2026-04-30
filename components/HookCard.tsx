"use client";

import type { Hook } from "@/lib/types";
import { CategoryBadge } from "./CategoryBadge";
import { EventBadge } from "./EventBadge";
import { CopyButton } from "./CopyButton";

interface Props {
  hook: Hook;
  index: number;
  expanded: boolean;
  onToggle: () => void;
  view: "comfortable" | "compact";
  related: Hook[];
  onSelect: (id: string) => void;
}

export function HookCard({ hook, index, expanded, onToggle, view, related, onSelect }: Props) {
  if (view === "compact") {
    return <CompactRow hook={hook} index={index} expanded={expanded} onToggle={onToggle} related={related} onSelect={onSelect} />;
  }

  return (
    <article
      className={`group relative flex flex-col border bg-[var(--bg-elev)] elev transition-colors ${
        expanded
          ? "border-[var(--acid)] sm:col-span-2 lg:col-span-3"
          : "border-[var(--rule)] hover:border-[var(--rule-strong)]"
      }`}
    >
      <button
        onClick={onToggle}
        aria-expanded={expanded}
        className="flex flex-col gap-4 p-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--acid)]"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <span className="mono text-[10px] uppercase tracking-[0.22em] text-[var(--ink-faint)]">
              № {String(index + 1).padStart(3, "0")}
            </span>
            <CategoryBadge category={hook.category} />
          </div>
          <span
            className={`mono text-[18px] leading-none transition-transform ${
              expanded ? "rotate-45 text-[var(--acid)]" : "text-[var(--ink-faint)] group-hover:text-[var(--ink-mute)]"
            }`}
            aria-hidden="true"
          >
            +
          </span>
        </div>

        <div>
          <h2 className="display text-[26px] leading-[1.05] text-[var(--ink)]">
            {hook.name}
          </h2>
          <p
            className={`mt-2 text-[13.5px] leading-relaxed text-[var(--ink-mute)] ${
              expanded ? "" : "line-clamp-2"
            }`}
          >
            {hook.description}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <EventBadge event={hook.event} matcher={hook.matcher} />
          <span className="mono text-[10.5px] text-[var(--ink-faint)]">
            ★ <span className="text-[var(--ink-mute)]">{hook.stars.toLocaleString()}</span>
          </span>
          <span className="mono text-[10.5px] text-[var(--ink-faint)]">
            · {hook.language}
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-[var(--rule)] pt-3">
          <span className="flex items-center gap-2">
            <img
              src={`https://github.com/${hook.author}.png?size=32`}
              alt=""
              width={18}
              height={18}
              className="rounded-full"
            />
            <span className="mono text-[11px] text-[var(--ink-mute)]">@{hook.author}</span>
          </span>
          <span className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-faint)] group-hover:text-[var(--acid)]">
            {expanded ? "close ↑" : "expand ↓"}
          </span>
        </div>
      </button>

      {expanded ? (
        <ExpandedPanel hook={hook} related={related} onSelect={onSelect} />
      ) : null}
    </article>
  );
}

function CompactRow({
  hook,
  index,
  expanded,
  onToggle,
  related,
  onSelect,
}: {
  hook: Hook;
  index: number;
  expanded: boolean;
  onToggle: () => void;
  related: Hook[];
  onSelect: (id: string) => void;
}) {
  return (
    <article
      className={`border-b border-[var(--rule)] transition-colors ${
        expanded ? "bg-[var(--bg-elev)]" : "hover:bg-[var(--bg-elev)]/50"
      }`}
    >
      <button
        onClick={onToggle}
        aria-expanded={expanded}
        className="grid w-full grid-cols-[3rem_1fr_auto] items-center gap-4 px-3 py-3 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--acid)] sm:grid-cols-[2.5rem_16rem_minmax(0,1fr)_10rem_4rem_2rem] sm:gap-5"
      >
        <span className="mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink-faint)]">
          {String(index + 1).padStart(3, "0")}
        </span>

        <span className="flex flex-col">
          <span className="display text-[18px] leading-tight text-[var(--ink)]">{hook.name}</span>
          <span className="mono mt-1 text-[10px] uppercase tracking-[0.18em] text-[var(--ink-faint)]">
            @{hook.author}
          </span>
        </span>

        <span className="hidden truncate text-[12.5px] text-[var(--ink-mute)] sm:block">
          {hook.description}
        </span>

        <span className="hidden sm:block">
          <CategoryBadge category={hook.category} />
        </span>

        <span className="mono hidden text-[11px] text-[var(--ink-mute)] sm:inline">
          ★ {hook.stars.toLocaleString()}
        </span>

        <span
          className={`mono justify-self-end text-[18px] leading-none transition-transform ${
            expanded ? "rotate-45 text-[var(--acid)]" : "text-[var(--ink-faint)]"
          }`}
          aria-hidden
        >
          +
        </span>
      </button>

      {expanded ? (
        <div className="border-t border-[var(--rule)]">
          <ExpandedPanel hook={hook} related={related} onSelect={onSelect} />
        </div>
      ) : null}
    </article>
  );
}

function ExpandedPanel({
  hook,
  related,
  onSelect,
}: {
  hook: Hook;
  related: Hook[];
  onSelect: (id: string) => void;
}) {
  return (
    <div className="fade-up grid gap-0 border-t border-[var(--rule)] lg:grid-cols-[1.1fr_1fr]">
      {/* Left: snippet */}
      <div className="flex min-w-0 flex-col border-b border-[var(--rule)] lg:border-b-0 lg:border-r">
        <div className="flex items-center justify-between border-b border-[var(--rule)] bg-[var(--bg-elev-2)] px-4 py-2.5">
          <div className="mono flex items-center gap-3 text-[10.5px] uppercase tracking-[0.18em] text-[var(--ink-faint)]">
            <span className="flex gap-1">
              <span className="h-2 w-2 rounded-full bg-[#ff6b6b]/70" />
              <span className="h-2 w-2 rounded-full bg-[#f5c542]/70" />
              <span className="h-2 w-2 rounded-full bg-[#62e3a4]/70" />
            </span>
            <span>~/.claude/settings.json</span>
          </div>
          <CopyButton snippet={hook.snippet} variant="ghost" label="Copy" />
        </div>
        <pre className="code-block line-numbers overflow-x-auto bg-[var(--bg)] px-4 py-4 text-[var(--ink)]">
          <SyntaxJson json={hook.snippet} />
        </pre>
      </div>

      {/* Right: meta */}
      <div className="flex flex-col gap-6 p-5 lg:p-6">
        <section>
          <h3 className="mono mb-2 text-[10px] uppercase tracking-[0.22em] text-[var(--ink-faint)]">
            About
          </h3>
          <p className="text-[13.5px] leading-relaxed text-[var(--ink)]">{hook.description}</p>
        </section>

        <section className="grid grid-cols-2 gap-4">
          <Stat label="Event" value={hook.event} mono />
          <Stat label="Matcher" value={hook.matcher ?? "—"} mono accent={!!hook.matcher} />
          <Stat label="Language" value={hook.language} mono />
          <Stat label="Stars" value={`★ ${hook.stars.toLocaleString()}`} mono />
          <Stat label="Added" value={new Date(hook.addedAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })} mono />
          <Stat label="Author" value={`@${hook.author}`} mono />
        </section>

        <section>
          <h3 className="mono mb-2 text-[10px] uppercase tracking-[0.22em] text-[var(--ink-faint)]">
            Tags
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {hook.tags.map((t) => (
              <span
                key={t}
                className="mono border border-[var(--rule-strong)] bg-[var(--bg-elev-2)] px-2 py-1 text-[10.5px] text-[var(--ink-mute)]"
              >
                #{t}
              </span>
            ))}
          </div>
        </section>

        <section>
          <h3 className="mono mb-2 text-[10px] uppercase tracking-[0.22em] text-[var(--ink-faint)]">
            Install
          </h3>
          <ol className="space-y-1.5 text-[12.5px] leading-relaxed text-[var(--ink-mute)]">
            <li className="flex gap-2">
              <span className="mono text-[var(--acid)]">01</span>
              <span>
                Open <span className="mono text-[var(--ink)]">~/.claude/settings.json</span>
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mono text-[var(--acid)]">02</span>
              <span>Merge the <span className="mono text-[var(--ink)]">hooks</span> block from the snippet on the left.</span>
            </li>
            <li className="flex gap-2">
              <span className="mono text-[var(--acid)]">03</span>
              <span>Restart Claude Code — the hook fires on the next matching event.</span>
            </li>
          </ol>
        </section>

        {related.length > 0 ? (
          <section>
            <h3 className="mono mb-2 text-[10px] uppercase tracking-[0.22em] text-[var(--ink-faint)]">
              Related in {hook.category.replace("-", " / ")}
            </h3>
            <div className="grid grid-cols-1 gap-1.5">
              {related.map((r) => (
                <button
                  key={r.id}
                  onClick={() => onSelect(r.id)}
                  className="group flex items-center justify-between border border-[var(--rule-strong)] bg-[var(--bg-elev-2)] px-3 py-2 text-left transition-colors hover:border-[var(--acid)]"
                >
                  <span className="flex flex-col">
                    <span className="display text-[15px] leading-tight text-[var(--ink)]">{r.name}</span>
                    <span className="mono mt-0.5 text-[10px] uppercase tracking-[0.16em] text-[var(--ink-faint)]">@{r.author}</span>
                  </span>
                  <span className="mono text-[11px] text-[var(--ink-faint)] group-hover:text-[var(--acid)]">
                    open →
                  </span>
                </button>
              ))}
            </div>
          </section>
        ) : null}

        <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-[var(--rule)] pt-4">
          <CopyButton snippet={hook.snippet} variant="primary" label="Copy snippet" />
          <a
            href={hook.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mono inline-flex items-center gap-1.5 border border-[var(--rule-strong)] px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] text-[var(--ink-mute)] transition-colors hover:border-[var(--ink)] hover:text-[var(--ink)]"
          >
            View repo <span aria-hidden>↗</span>
          </a>
        </div>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  mono,
  accent,
}: {
  label: string;
  value: string;
  mono?: boolean;
  accent?: boolean;
}) {
  return (
    <div className="border border-[var(--rule)] bg-[var(--bg-elev-2)] px-3 py-2.5">
      <div className="mono text-[9.5px] uppercase tracking-[0.22em] text-[var(--ink-faint)]">{label}</div>
      <div
        className={`${mono ? "mono" : ""} mt-1 truncate text-[13px] ${
          accent ? "text-[var(--acid)]" : "text-[var(--ink)]"
        }`}
        title={value}
      >
        {value}
      </div>
    </div>
  );
}

// Tiny JSON syntax highlighter (no deps)
function SyntaxJson({ json }: { json: string }) {
  const lines = json.split("\n");
  return (
    <>
      {lines.map((line, i) => (
        <span key={i} dangerouslySetInnerHTML={{ __html: highlightJsonLine(line) }} />
      ))}
    </>
  );
}

function highlightJsonLine(line: string): string {
  const escape = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  let out = "";
  let i = 0;
  const s = line;
  while (i < s.length) {
    const ch = s[i];
    if (ch === '"') {
      // string
      let j = i + 1;
      while (j < s.length && !(s[j] === '"' && s[j - 1] !== "\\")) j++;
      const str = s.slice(i, j + 1);
      const isKey = s.slice(j + 1).trimStart().startsWith(":");
      out += `<span class="${isKey ? "tok-key" : "tok-str"}">${escape(str)}</span>`;
      i = j + 1;
    } else if (/[{}\[\],:]/.test(ch)) {
      out += `<span class="tok-punct">${escape(ch)}</span>`;
      i++;
    } else {
      out += escape(ch);
      i++;
    }
  }
  return out + "\n";
}
