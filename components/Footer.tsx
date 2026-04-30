export function Footer() {
  return (
    <footer className="mt-16 border-t border-[var(--rule)]">
      <div className="mx-auto max-w-[1400px] px-6 py-10 lg:px-10">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="display text-[34px] leading-[0.95] text-[var(--ink)]">
              Bring your hooks <span className="display-italic text-[var(--acid)]">home.</span>
            </p>
            <p className="mt-3 max-w-[28ch] text-[13px] leading-relaxed text-[var(--ink-mute)]">
              An open directory of community-built lifecycle hooks for Claude Code. Curated, indexed, copy-pasteable.
            </p>
          </div>

          <div>
            <p className="mono mb-3 text-[10px] uppercase tracking-[0.22em] text-[var(--ink-faint)]">Resources</p>
            <ul className="space-y-1.5 text-[13px]">
              <li>
                <a className="text-[var(--ink-mute)] hover:text-[var(--acid)]" href="https://docs.anthropic.com/en/docs/claude-code/hooks" target="_blank" rel="noopener noreferrer">
                  Hooks documentation ↗
                </a>
              </li>
              <li>
                <a className="text-[var(--ink-mute)] hover:text-[var(--acid)]" href="https://github.com/anthropics/claude-code" target="_blank" rel="noopener noreferrer">
                  Claude Code on GitHub ↗
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="mono mb-3 text-[10px] uppercase tracking-[0.22em] text-[var(--ink-faint)]">Contribute</p>
            <a
              href="https://github.com/anthropics/claude-code/issues/new?template=hook-submission.md"
              target="_blank"
              rel="noopener noreferrer"
              className="mono inline-flex items-center gap-2 border border-[var(--acid)] px-3 py-2 text-[11px] uppercase tracking-[0.14em] text-[var(--acid)] transition-colors hover:bg-[var(--acid)] hover:text-black"
            >
              Submit a Hook <span aria-hidden>→</span>
            </a>
          </div>
        </div>

        <div className="mono mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--rule)] pt-5 text-[10px] uppercase tracking-[0.22em] text-[var(--ink-faint)]">
          <span>© 2026 · No affiliation with Anthropic</span>
          <span>Built for the Claude Code community</span>
        </div>
      </div>
    </footer>
  );
}
