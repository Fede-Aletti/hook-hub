import type { HookCategory } from "@/lib/types";

const styles: Record<HookCategory, { dot: string; text: string }> = {
  security:            { dot: "bg-[#ff6b6b]", text: "text-[#ffb1b1]" },
  formatting:          { dot: "bg-[#7adcff]", text: "text-[#bcebff]" },
  logging:             { dot: "bg-[#f5c542]", text: "text-[#fbe39a]" },
  environment:         { dot: "bg-[#62e3a4]", text: "text-[#b5f1d2]" },
  "ci-cd":             { dot: "bg-[#c4a8ff]", text: "text-[#ddccff]" },
  productivity:        { dot: "bg-[#ff9a4d]", text: "text-[#ffc99a]" },
  "input-sanitization":{ dot: "bg-[#ff7ad9]", text: "text-[#ffb6e8]" },
  other:               { dot: "bg-[#9c9789]", text: "text-[#cfc9b9]" },
};

const labels: Record<HookCategory, string> = {
  security: "Security",
  formatting: "Formatting",
  logging: "Logging",
  environment: "Environment",
  "ci-cd": "CI/CD",
  productivity: "Productivity",
  "input-sanitization": "Input Sanitization",
  other: "Other",
};

export function CategoryBadge({ category, size = "sm" }: { category: HookCategory; size?: "sm" | "md" }) {
  const s = styles[category];
  return (
    <span
      className={`mono inline-flex items-center gap-1.5 uppercase tracking-[0.14em] ${s.text} ${
        size === "md" ? "text-[11px]" : "text-[10px]"
      }`}
    >
      <span className={`h-1.5 w-1.5 ${s.dot}`} aria-hidden="true" />
      {labels[category]}
    </span>
  );
}
