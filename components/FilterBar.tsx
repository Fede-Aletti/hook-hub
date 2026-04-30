"use client";

import { useEffect, useRef } from "react";
import type { HookCategory, HookEvent } from "@/lib/types";

const CATEGORIES: { value: HookCategory | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "security", label: "Security" },
  { value: "formatting", label: "Formatting" },
  { value: "logging", label: "Logging" },
  { value: "environment", label: "Environment" },
  { value: "ci-cd", label: "CI/CD" },
  { value: "productivity", label: "Productivity" },
  { value: "input-sanitization", label: "Sanitization" },
  { value: "other", label: "Other" },
];

const EVENTS: HookEvent[] = [
  "PreToolUse",
  "PostToolUse",
  "PostToolUseFailure",
  "UserPromptSubmit",
  "Stop",
  "SubagentStop",
  "SessionStart",
  "CwdChanged",
  "FileChanged",
  "PreCompact",
  "WorktreeCreate",
  "PermissionRequest",
];

export type ViewMode = "comfortable" | "compact";

interface FilterBarProps {
  search: string;
  category: HookCategory | "all";
  event: HookEvent | "all";
  sort: "stars" | "newest" | "az";
  view: ViewMode;
  onSearch: (v: string) => void;
  onCategory: (v: HookCategory | "all") => void;
  onEvent: (v: HookEvent | "all") => void;
  onSort: (v: "stars" | "newest" | "az") => void;
  onView: (v: ViewMode) => void;
}

export function FilterBar({
  search,
  category,
  event,
  sort,
  view,
  onSearch,
  onCategory,
  onEvent,
  onSort,
  onView,
}: FilterBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement)?.tagName;
      if (e.key === "/" && tag !== "INPUT" && tag !== "TEXTAREA" && tag !== "SELECT") {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape" && document.activeElement === inputRef.current) {
        inputRef.current?.blur();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="sticky top-0 z-20 border-b border-[var(--rule)] bg-[var(--bg)]/85 backdrop-blur-md">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="flex items-stretch gap-3 border-b border-[var(--rule)] py-3">
          <label className="group relative flex flex-1 items-center">
            <span className="mono pointer-events-none absolute left-3 select-none text-[12px] text-[var(--acid)]">
              ❯
            </span>
            <input
              ref={inputRef}
              type="search"
              value={search}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="search hooks, tags, authors…"
              className="mono w-full border border-[var(--rule-strong)] bg-[var(--bg-elev)] py-2.5 pl-8 pr-20 text-[13px] text-[var(--ink)] placeholder-[var(--ink-faint)] outline-none transition-colors focus:border-[var(--acid)]"
            />
            <span className="pointer-events-none absolute right-3 hidden items-center gap-1 sm:flex">
              <span className="kbd">/</span>
            </span>
          </label>

          <div className="hidden items-center md:flex">
            <span className="mono mr-2 text-[10px] uppercase tracking-[0.18em] text-[var(--ink-faint)]">
              sort
            </span>
            <div className="flex border border-[var(--rule-strong)]">
              {([
                ["stars", "★ stars"],
                ["newest", "newest"],
                ["az", "a–z"],
              ] as const).map(([v, label]) => (
                <button
                  key={v}
                  onClick={() => onSort(v)}
                  className={`mono border-l border-[var(--rule-strong)] px-3 py-2 text-[11px] uppercase tracking-[0.14em] first:border-l-0 transition-colors ${
                    sort === v
                      ? "bg-[var(--ink)] text-black"
                      : "text-[var(--ink-mute)] hover:text-[var(--ink)]"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="hidden items-center md:flex">
            <div className="flex border border-[var(--rule-strong)]">
              <button
                onClick={() => onView("comfortable")}
                aria-label="Comfortable view"
                className={`px-2.5 py-2 transition-colors ${
                  view === "comfortable" ? "bg-[var(--ink)] text-black" : "text-[var(--ink-mute)] hover:text-[var(--ink)]"
                }`}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <rect x="1" y="1" width="5" height="5" stroke="currentColor" strokeWidth="1.2" />
                  <rect x="8" y="1" width="5" height="5" stroke="currentColor" strokeWidth="1.2" />
                  <rect x="1" y="8" width="5" height="5" stroke="currentColor" strokeWidth="1.2" />
                  <rect x="8" y="8" width="5" height="5" stroke="currentColor" strokeWidth="1.2" />
                </svg>
              </button>
              <button
                onClick={() => onView("compact")}
                aria-label="Compact list view"
                className={`border-l border-[var(--rule-strong)] px-2.5 py-2 transition-colors ${
                  view === "compact" ? "bg-[var(--ink)] text-black" : "text-[var(--ink-mute)] hover:text-[var(--ink)]"
                }`}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M1 3h12M1 7h12M1 11h12" stroke="currentColor" strokeWidth="1.2" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 py-3">
          <div className="flex items-center gap-2">
            <span className="mono text-[10px] uppercase tracking-[0.22em] text-[var(--ink-faint)]">
              category /
            </span>
            <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by category">
              {CATEGORIES.map((cat) => {
                const active = category === cat.value;
                return (
                  <button
                    key={cat.value}
                    onClick={() => onCategory(cat.value)}
                    aria-pressed={active}
                    className={`mono border px-2.5 py-1 text-[10.5px] uppercase tracking-[0.14em] transition-colors ${
                      active
                        ? "border-[var(--acid)] bg-[var(--acid)] text-black"
                        : "border-[var(--rule-strong)] text-[var(--ink-mute)] hover:border-[var(--ink-mute)] hover:text-[var(--ink)]"
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <span className="mono text-[10px] uppercase tracking-[0.22em] text-[var(--ink-faint)]">
              event /
            </span>
            <select
              value={event}
              onChange={(e) => onEvent(e.target.value as HookEvent | "all")}
              className="mono border border-[var(--rule-strong)] bg-[var(--bg-elev)] px-2.5 py-1 text-[11px] text-[var(--ink)] outline-none focus:border-[var(--acid)]"
            >
              <option value="all">all events</option>
              {EVENTS.map((ev) => (
                <option key={ev} value={ev}>
                  {ev}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
