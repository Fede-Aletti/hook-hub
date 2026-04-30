export function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-[#0a0a0a]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm text-zinc-500 sm:flex-row sm:px-6 lg:px-8">
        <p>
          Built for the{" "}
          <a
            href="https://docs.anthropic.com/en/docs/claude-code/hooks"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 underline-offset-2 hover:text-zinc-200 hover:underline"
          >
            Claude Code
          </a>{" "}
          community.
        </p>
        <a
          href="https://github.com/anthropics/claude-code/issues/new?template=hook-submission.md"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-violet-400 underline-offset-2 hover:text-violet-300 hover:underline"
        >
          + Submit a Hook
        </a>
      </div>
    </footer>
  );
}
