<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Project Spec

Before writing any feature code, read **[SPEC.md](../memory/spec/SPEC.md)** for:
- What HookHub is and what it does
- The `Hook` data model and all field definitions
- Hook categories and lifecycle events
- Pages, routes, and component architecture
- The v1 data strategy (static TypeScript array, no backend)
- UI design principles and what is out of scope for v1

All implementation decisions should align with SPEC.md. If a task conflicts with the spec, flag it rather than guessing.
