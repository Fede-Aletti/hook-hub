"use client";

import type { HookCategory, HookEvent } from "@/lib/types";

const CATEGORIES: { value: HookCategory | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "security", label: "Security" },
  { value: "formatting", label: "Formatting" },
  { value: "logging", label: "Logging" },
  { value: "environment", label: "Environment" },
  { value: "ci-cd", label: "CI/CD" },
  { value: "productivity", label: "Productivity" },
  { value: "input-sanitization", label: "Input Sanitization" },
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

interface FilterBarProps {
  search: string;
  category: HookCategory | "all";
  event: HookEvent | "all";
  sort: "stars" | "newest" | "az";
  onSearch: (v: string) => void;
  onCategory: (v: HookCategory | "all") => void;
  onEvent: (v: HookEvent | "all") => void;
  onSort: (v: "stars" | "newest" | "az") => void;
}

export function FilterBar({
  search,
  category,
  event,
  sort,
  onSearch,
  onCategory,
  onEvent,
  onSort,
}: FilterBarProps) {
  return (
    <div className="sticky top-0 z-10 border-b border-zinc-800 bg-[#0a0a0a]/90 py-4 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3">
          <div className="flex gap-3">
            <label className="flex-1">
              <span className="sr-only">Search hooks</span>
              <input
                type="search"
                value={search}
                onChange={(e) => onSearch(e.target.value)}
                placeholder="Search hooks..."
                className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm text-zinc-100 placeholder-zinc-500 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
              />
            </label>

            <label className="flex items-center gap-2">
              <span className="sr-only">Sort by</span>
              <select
                value={sort}
                onChange={(e) => onSort(e.target.value as "stars" | "newest" | "az")}
                className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
              >
                <option value="stars">Most Stars</option>
                <option value="newest">Newest</option>
                <option value="az">A–Z</option>
              </select>
            </label>

            <label className="flex items-center gap-2">
              <span className="sr-only">Filter by event</span>
              <select
                value={event}
                onChange={(e) => onEvent(e.target.value as HookEvent | "all")}
                className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
              >
                <option value="all">All Events</option>
                {EVENTS.map((ev) => (
                  <option key={ev} value={ev}>
                    {ev}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => onCategory(cat.value)}
                aria-pressed={category === cat.value}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500 ${
                  category === cat.value
                    ? "bg-violet-600 text-white"
                    : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
