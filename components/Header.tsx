export function Header() {
  return (
    <header className="border-b border-[var(--rule)] bg-[var(--bg)]/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 lg:px-10">
        <div className="flex items-center gap-4">
          <a href="/" className="group flex items-baseline gap-3">
            <span className="display text-[28px] leading-none text-[var(--ink)]">
              Hook<span className="display-italic text-[var(--acid)]">Hub</span>
              <span className="cursor-blink ml-0.5 inline-block h-[18px] w-[8px] translate-y-[3px] bg-[var(--acid)]" aria-hidden="true" />
            </span>
            <span className="mono hidden text-[10px] uppercase tracking-[0.22em] text-[var(--ink-faint)] sm:inline">
              vol. 01 · the almanac
            </span>
          </a>
        </div>

        <nav className="flex items-center gap-1.5">
          <a
            href="https://docs.anthropic.com/en/docs/claude-code/hooks"
            target="_blank"
            rel="noopener noreferrer"
            className="mono hidden items-center gap-1.5 px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] text-[var(--ink-mute)] transition-colors hover:text-[var(--ink)] sm:inline-flex"
          >
            Docs <span aria-hidden>↗</span>
          </a>
          <a
            href="https://github.com/anthropics/claude-code"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="mono inline-flex items-center gap-2 border border-[var(--rule-strong)] px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] text-[var(--ink-mute)] transition-colors hover:border-[var(--acid)] hover:text-[var(--acid)]"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
