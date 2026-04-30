import type { Hook } from "@/lib/types";
import { HookCard } from "./HookCard";

export function HookGrid({ hooks }: { hooks: Hook[] }) {
  if (hooks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-lg font-medium text-zinc-300">No hooks found</p>
        <p className="mt-1 text-sm text-zinc-500">Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {hooks.map((hook) => (
        <HookCard key={hook.id} hook={hook} />
      ))}
    </div>
  );
}
