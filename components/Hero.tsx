import type { Hook } from "@/lib/types";

interface Props {
  hooks: Hook[];
  totalStars: number;
  topCategory?: [string, number];
}

export function Hero({ hooks, totalStars, topCategory }: Props) {
  const topThree = [...hooks].sort((a, b) => b.stars - a.stars).slice(0, 3);
  const tickerItems = [...hooks].sort((a, b) => b.stars - a.stars).slice(0, 8);

  return (
    <section className="relative overflow-hidden border-b border-[var(--rule)]">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        {/* Top meta row */}
        <div className="mono flex items-center justify-between border-b border-[var(--rule)] py-2.5 text-[10px] uppercase tracking-[0.22em] text-[var(--ink-faint)]">
          <span>Issue 01 · Spring 2026</span>
          <span className="hidden sm:inline">An open directory for Claude Code</span>
          <span>
            <span className="cursor-blink mr-1.5 inline-block h-2 w-2 translate-y-[1px] bg-[var(--acid)]" />
            live · {hooks.length} entries indexed
          </span>
        </div>

        <div className="grid gap-10 py-12 md:grid-cols-[1.6fr_1fr] md:py-16 lg:py-20">
          {/* Headline */}
          <div className="flex flex-col justify-between gap-8">
            <h1 className="display text-[clamp(56px,9vw,128px)] tracking-[-0.025em]">
              <span className="block text-[var(--ink)]">The almanac</span>
              <span className="block text-[var(--ink)]">
                of <span className="display-italic text-[var(--acid)] mark">hooks</span>
              </span>
              <span className="block text-[var(--ink-mute)] display-italic">
                for Claude Code.
              </span>
            </h1>

            <div className="grid max-w-[58ch] gap-3 text-[14px] leading-relaxed text-[var(--ink-mute)] sm:grid-cols-[3rem_1fr]">
              <span className="mono pt-1 text-[10px] uppercase tracking-[0.22em] text-[var(--ink-faint)]">
                Re:
              </span>
              <p>
                A curated index of community-built lifecycle hooks — security guards, formatters, loggers, CI gates.
                Browse the catalog, expand any entry to read the snippet in full, and copy it straight into your{" "}
                <span className="mono text-[var(--ink)]">~/.claude/settings.json</span>.
              </p>
            </div>
          </div>

          {/* Stats panel */}
          <aside className="flex flex-col">
            <div className="mono mb-3 text-[10px] uppercase tracking-[0.22em] text-[var(--ink-faint)]">
              ~/.hookhub/stats.json
            </div>
            <div className="grid grid-cols-2 gap-px border border-[var(--rule)] bg-[var(--rule)]">
              <Stat k="Hooks" v={hooks.length.toString()} />
              <Stat k="Stars" v={formatStars(totalStars)} />
              <Stat
                k="Top category"
                v={topCategory ? topCategory[0].replace("-", " / ") : "—"}
                small
              />
              <Stat
                k="Languages"
                v={Array.from(new Set(hooks.map((h) => h.language))).length.toString()}
              />
            </div>

            <div className="mt-5 border border-[var(--rule)] bg-[var(--bg-elev)] p-4">
              <div className="mono mb-3 flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-[var(--ink-faint)]">
                <span>★ Most starred</span>
                <span>top 3</span>
              </div>
              <ol className="space-y-2.5">
                {topThree.map((h, i) => (
                  <li key={h.id} className="grid grid-cols-[1.5rem_1fr_auto] items-baseline gap-3">
                    <span className="display display-italic text-[20px] leading-none text-[var(--acid)]">
                      {i + 1}
                    </span>
                    <span className="display truncate text-[16px] leading-tight text-[var(--ink)]">
                      {h.name}
                    </span>
                    <span className="mono text-[11px] text-[var(--ink-mute)]">
                      {h.stars.toLocaleString()}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
      </div>

      {/* Ticker */}
      <div className="overflow-hidden border-y border-[var(--rule)] bg-[var(--bg-elev)] py-2.5">
        <div className="marquee flex w-max items-center gap-10 whitespace-nowrap">
          {[...tickerItems, ...tickerItems].map((h, i) => (
            <span key={i} className="mono flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-[var(--ink-mute)]">
              <span className="text-[var(--acid)]">★</span>
              <span className="text-[var(--ink)]">{h.name}</span>
              <span className="text-[var(--ink-faint)]">·</span>
              <span>{h.event}</span>
              <span className="text-[var(--ink-faint)]">·</span>
              <span>@{h.author}</span>
              <span className="ml-6 text-[var(--ink-ghost)]">◆</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stat({ k, v, small }: { k: string; v: string; small?: boolean }) {
  return (
    <div className="bg-[var(--bg-elev)] p-4">
      <div className="mono mb-1.5 text-[10px] uppercase tracking-[0.22em] text-[var(--ink-faint)]">
        {k}
      </div>
      <div className={`display text-[var(--ink)] ${small ? "text-[26px]" : "text-[40px]"} leading-none capitalize`}>
        {v}
      </div>
    </div>
  );
}

function formatStars(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return n.toString();
}
