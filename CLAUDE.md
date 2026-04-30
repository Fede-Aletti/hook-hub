# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development

- **Start dev server**: `npm run dev`
  - Runs Next.js dev server on http://localhost:3000
  - Fast refresh enabled for immediate feedback on code changes

### Building & Deployment

- **Build for production**: `npm run build`
  - Creates optimized production build in `.next/` directory
  - Runs ESLint check before building
- **Start production server**: `npm start`
  - Runs the production-optimized build (requires `npm run build` first)

### Code Quality

- **Lint code**: `npm run lint`
  - Runs ESLint across the project using flat config system (ESLint v9+)
  - Uses Next.js core-web-vitals and TypeScript configs
  - Ignores `.next/`, `out/`, `build/`, and `next-env.d.ts`

### Type Checking

- TypeScript is configured in strict mode
- VSCode or IDE should provide real-time type checking
- Run `npx tsc --noEmit` to check types without emitting files

## Project Spec

Read **[SPEC.md](../memory/spec/SPEC.md)** before writing any feature code. It defines:
- What HookHub is and what it does
- The `Hook` data model (`lib/types.ts`) and all field definitions
- Hook categories (`HookCategory`) and lifecycle events (`HookEvent`)
- Pages (`/` grid, `/hooks/[id]` detail) and component architecture
- The v1 data strategy: static array in `lib/hooks-data.ts`, no backend
- UI design principles (dark-first, copy-paste CTA) and v1 out-of-scope items

## Project Architecture

### Tech Stack

- **Next.js 16.2.4**: Using App Router (not Pages Router)
- **React 19.2.4**: Latest React with concurrent features
- **TypeScript 5**: Strict type checking enabled
- **Tailwind CSS v4**: Using new `@tailwindcss/postcss` with PostCSS
- **ESLint 9**: Flat config system with Next.js presets

### Directory Structure

- `/app` - Next.js App Router pages and layouts
  - `layout.tsx` - Root layout component
  - `page.tsx` - Home page
  - `globals.css` - Global styles (processed by Tailwind)
  - `favicon.ico` - Site favicon
- `/public` - Static assets served at root path
- `tsconfig.json` - TypeScript configuration with `@/*` path alias
- `eslint.config.mjs` - Flat ESLint config
- `next.config.ts` - Next.js configuration
- `postcss.config.mjs` - PostCSS config for Tailwind CSS v4

### Path Aliases

- `@/*` resolves to the project root (e.g., `@/app/component` or `@/lib/utils`)
- Configured in `tsconfig.json`

## Important Notes

### Next.js v16 Breaking Changes

**⚠️ This version has breaking changes.** APIs, conventions, and file structure may differ from your training knowledge. Before writing code:

1. Check `node_modules/next/dist/docs/` for the official guide on features you're implementing
2. Watch for deprecation notices in the docs
3. Verify examples match the current API before following them

### ESLint Configuration

- Uses new flat config system (`eslint.config.mjs`)
- Includes Next.js core web vitals checks
- TypeScript linting enabled
- Do NOT try to modify or create `.eslintrc.json` - the flat config takes precedence

### Tailwind CSS v4

- Using the new `@tailwindcss/postcss` plugin
- See `postcss.config.mjs` for configuration
- Write styles in `/app/globals.css` or component files

## Debugging

### Common Issues

- **Dev server not starting**: Check if port 3000 is already in use, or use `npm run dev -- -p 3001`
- **TypeScript errors after dependencies change**: Run `npm install` and restart dev server
- **Tailwind styles not applying**: Ensure CSS is imported in layout or page components

### Using Chrome DevTools

- Open http://localhost:3000 in browser
- Use React DevTools browser extension for component debugging
- Use Network tab to inspect API calls
