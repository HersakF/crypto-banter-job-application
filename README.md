# Crypto Banter

A Vue 3 app for browsing challenges with days and tasks. You move through days by clicking Next; the first “Next” triggers a simulated exchange (random delay, random success or error). Progress is tracked locally. Built with Vue 3, Vite, TypeScript, Pinia, Vue Router, and Tailwind CSS.

## Prerequisites

- **Node.js 24** (see `engines` in `package.json`)
- **pnpm** (project uses `packageManager: "pnpm@10.28.2"`)

## Setup

```bash
# Use Node 24 (if you use nvm)
nvm use 24

# Install dependencies
pnpm install
```

## Development

```bash
pnpm run dev
```

Then open the URL shown in the terminal (usually `http://localhost:5173`).

## Other scripts

| Command           | Description                    |
|-------------------|--------------------------------|
| `pnpm run build`  | Type-check and production build |
| `pnpm run preview` | Serve the production build   |
| `pnpm run lint`   | Run ESLint                    |
| `pnpm run lint:fix` | Run ESLint with auto-fix   |
| `pnpm run format` | Format with Prettier          |
| `pnpm run format:check` | Check formatting with Prettier |
