"use client";

import { useState } from "react";

export function CopyButton({
  snippet,
  label = "Copy snippet",
  variant = "primary",
}: {
  snippet: string;
  label?: string;
  variant?: "primary" | "ghost";
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy(e: React.MouseEvent) {
    e.stopPropagation();
    await navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  const base =
    "mono group inline-flex items-center gap-2 px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--acid)]";

  const styles =
    variant === "primary"
      ? copied
        ? "bg-[var(--acid)] text-black"
        : "bg-[var(--ink)] text-black hover:bg-[var(--acid)]"
      : copied
        ? "border border-[var(--acid)] text-[var(--acid)]"
        : "border border-[var(--rule-strong)] text-[var(--ink-mute)] hover:border-[var(--acid)] hover:text-[var(--acid)]";

  return (
    <button onClick={handleCopy} aria-label="Copy snippet to clipboard" className={`${base} ${styles}`}>
      {copied ? (
        <>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
          </svg>
          Copied
        </>
      ) : (
        <>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <rect x="3.5" y="1.5" width="6" height="7" stroke="currentColor" strokeWidth="1.2" />
            <rect x="1.5" y="3.5" width="6" height="7" stroke="currentColor" strokeWidth="1.2" />
          </svg>
          {label}
        </>
      )}
    </button>
  );
}
