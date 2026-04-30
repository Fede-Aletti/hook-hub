"use client";

import { useEffect, useMemo, useState } from "react";
import type { Hook, HookCategory, HookEvent } from "@/lib/types";
import { FilterBar, type ViewMode } from "./FilterBar";
import { HookGrid } from "./HookGrid";
import { Hero } from "./Hero";

export function HomeClient({ hooks }: { hooks: Hook[] }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<HookCategory | "all">("all");
  const [event, setEvent] = useState<HookEvent | "all">("all");
  const [sort, setSort] = useState<"stars" | "newest" | "az">("stars");
  const [view, setView] = useState<ViewMode>("comfortable");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let result = hooks;

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (h) =>
          h.name.toLowerCase().includes(q) ||
          h.description.toLowerCase().includes(q) ||
          h.author.toLowerCase().includes(q) ||
          h.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (category !== "all") result = result.filter((h) => h.category === category);
    if (event !== "all") result = result.filter((h) => h.event === event);

    return [...result].sort((a, b) => {
      if (sort === "stars") return b.stars - a.stars;
      if (sort === "newest") return a.addedAt < b.addedAt ? 1 : -1;
      return a.name.localeCompare(b.name);
    });
  }, [hooks, search, category, event, sort]);

  function handleToggle(id: string) {
    setExpandedId((cur) => {
      if (cur === id) return null;
      // Smooth scroll the newly-expanded card into view
      requestAnimationFrame(() => {
        const el = document.querySelector(`[data-hook-id="${id}"]`);
        el?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      });
      return id;
    });
  }

  // Close expanded with Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && expandedId) setExpandedId(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [expandedId]);

  const totalStars = useMemo(() => hooks.reduce((s, h) => s + h.stars, 0), [hooks]);
  const topCategoryCount = useMemo(() => {
    const counts: Record<string, number> = {};
    hooks.forEach((h) => (counts[h.category] = (counts[h.category] ?? 0) + 1));
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
  }, [hooks]);

  const hasActiveFilters = search.trim() || category !== "all" || event !== "all";

  return (
    <>
      <Hero hooks={hooks} totalStars={totalStars} topCategory={topCategoryCount} />

      <FilterBar
        search={search}
        category={category}
        event={event}
        sort={sort}
        view={view}
        onSearch={setSearch}
        onCategory={setCategory}
        onEvent={setEvent}
        onSort={setSort}
        onView={setView}
      />

      <main className="mx-auto w-full max-w-[1400px] flex-1 px-6 py-10 lg:px-10">
        <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3 border-b border-[var(--rule)] pb-4">
          <div className="flex items-baseline gap-3">
            <h2 className="display text-[36px] leading-none text-[var(--ink)]">
              Index
            </h2>
            <span className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--ink-faint)]">
              {filtered.length} of {hooks.length} hooks
            </span>
          </div>

          {hasActiveFilters ? (
            <div className="flex flex-wrap items-center gap-2">
              {search.trim() ? (
                <Chip label={`q: ${search}`} onClear={() => setSearch("")} />
              ) : null}
              {category !== "all" ? (
                <Chip label={`category: ${category}`} onClear={() => setCategory("all")} />
              ) : null}
              {event !== "all" ? (
                <Chip label={`event: ${event}`} onClear={() => setEvent("all")} />
              ) : null}
              <button
                onClick={() => {
                  setSearch("");
                  setCategory("all");
                  setEvent("all");
                }}
                className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-faint)] underline-offset-4 hover:text-[var(--acid)] hover:underline"
              >
                clear all
              </button>
            </div>
          ) : null}
        </div>

        <div data-hook-grid>
          {filtered.map((h) => (
            <span key={h.id} data-hook-id={h.id} className="contents" />
          ))}
          <HookGrid
            hooks={filtered}
            allHooks={hooks}
            expandedId={expandedId}
            onToggle={handleToggle}
            view={view}
          />
        </div>

        <div className="mono mt-10 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.22em] text-[var(--ink-faint)]">
          <span className="kbd">/</span> search
          <span className="text-[var(--ink-ghost)]">·</span>
          <span className="kbd">↵</span> expand
          <span className="text-[var(--ink-ghost)]">·</span>
          <span className="kbd">esc</span> close
        </div>
      </main>
    </>
  );
}

function Chip({ label, onClear }: { label: string; onClear: () => void }) {
  return (
    <span className="mono inline-flex items-center gap-1.5 border border-[var(--acid)] bg-[var(--acid)]/10 px-2 py-1 text-[10.5px] uppercase tracking-[0.14em] text-[var(--acid)]">
      {label}
      <button
        onClick={onClear}
        aria-label={`Remove filter: ${label}`}
        className="text-[var(--acid)] hover:text-[var(--ink)]"
      >
        ✕
      </button>
    </span>
  );
}
