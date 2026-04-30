"use client";

import { useState, useMemo } from "react";
import type { Hook, HookCategory, HookEvent } from "@/lib/types";
import { FilterBar } from "./FilterBar";
import { HookGrid } from "./HookGrid";

export function HomeClient({ hooks }: { hooks: Hook[] }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<HookCategory | "all">("all");
  const [event, setEvent] = useState<HookEvent | "all">("all");
  const [sort, setSort] = useState<"stars" | "newest" | "az">("stars");

  const filtered = useMemo(() => {
    let result = hooks;

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (h) =>
          h.name.toLowerCase().includes(q) ||
          h.description.toLowerCase().includes(q) ||
          h.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (category !== "all") {
      result = result.filter((h) => h.category === category);
    }

    if (event !== "all") {
      result = result.filter((h) => h.event === event);
    }

    return [...result].sort((a, b) => {
      if (sort === "stars") return b.stars - a.stars;
      if (sort === "newest") return a.addedAt < b.addedAt ? 1 : -1;
      return a.name.localeCompare(b.name);
    });
  }, [hooks, search, category, event, sort]);

  return (
    <>
      <FilterBar
        search={search}
        category={category}
        event={event}
        sort={sort}
        onSearch={setSearch}
        onCategory={setCategory}
        onEvent={setEvent}
        onSort={setSort}
      />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <p className="mb-6 text-sm text-zinc-500">
          {filtered.length} hook{filtered.length !== 1 ? "s" : ""}
        </p>
        <HookGrid hooks={filtered} />
      </main>
    </>
  );
}
