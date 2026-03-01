# UI Components Plan

## Scope

Add eight presentational UI components under `components/ui/`, following .cursorrules: Composition API, `<script setup lang="ts" name="ComponentName">`, Tailwind-only styling, typed props, and one component per file in `components/<domain>/<component-name>/index.vue`.

---

## 1. Persist this plan

- Create directory `plan/components/ui/` if missing.
- Write this plan (component specs below) to `plan/components/ui/index.md` so it serves as the single source of truth for UI components.

---

## 2. Component specifications

### UIApp

- **Path:** `src/components/ui/app/index.vue`
- **Role:** Wrapper for the app shell; will wrap `<router-view>` in App.vue.
- **API:**
  - One default `<slot>` for content (router-view will be passed as slot content from App.vue).
- **Usage in App.vue:** `<UIApp><router-view /></UIApp>`

---

### UIButton

- **Path:** `src/components/ui/button/index.vue`
- **Role:** Configurable button.
- **API:**
  - **Props:** `size` (e.g. `'sm' | 'md' | 'lg'`), `severity` (e.g. `'neutral' | 'primary' | 'danger'`), `variant` (e.g. `'solid' | 'outline' | 'ghost'`). All optional with sensible defaults.
  - **Slots:** Default `<slot>` for label/content.
- **Emit:** `click` (forward native click).
- **Implementation:** Single root `<button>`, classes derived from prop combinations via Tailwind.

---

### UICard

- **Path:** `src/components/ui/card/index.vue`
- **Role:** Card container for content.
- **API:**
  - One default `<slot>` for card body.
- **Implementation:** Semantic wrapper (e.g. `<div>` or `<article>`) with Tailwind card styling (border, shadow, radius).

---

### UIContainer

- **Path:** `src/components/ui/container/index.vue`
- **Role:** Layout container with default padding and margin.
- **API:**
  - One default `<slot>` for content.
- **Implementation:** Single wrapper with Tailwind padding/margin (e.g. `max-w-*`, `mx-auto`, `px-*`).

---

### UIHeadline

- **Path:** `src/components/ui/headline/index.vue`
- **Role:** Section heading with title and optional description.
- **API:**
  - **Props:** `title` (string, required), `description` (string, optional).
- **Slots:** None required; optional slots for `title` and `description` can be added later for overrides if needed.
- **Implementation:** Renders `title` in a heading tag and `description` in a paragraph below; Tailwind for typography/spacing.

---

### UIError

- **Path:** `src/components/ui/error/index.vue`
- **Role:** Error state display.
- **API:**
  - **Props:** `message` (string, optional).
  - **Slots:** Default `<slot>` for additional content (e.g. actions or details).
- **Implementation:** Show `message` when provided; render slot content; Tailwind for error styling (e.g. border/background).

---

### UILoading

- **Path:** `src/components/ui/loading/index.vue`
- **Role:** Loading indicator.
- **API:**
  - **Props:** `message` (string, optional).
  - **Slots:** Default `<slot>` for extra content below/alongside the loader.
- **Implementation:** Inline SVG loader (e.g. spinner or circular progress) + optional `message` text + slot; Tailwind for layout and styling.

---

### UIProgress

- **Path:** `src/components/ui/progress/index.vue`
- **Role:** Progress bar.
- **API:**
  - **Props:** `value` (number, 0–100; percentage).
- **Implementation:** Semantic `<div>` track with inner bar; width driven by `value`; Tailwind; no slot unless you explicitly add one for label.

---

## 3. Shared types (optional)

- If multiple components share prop unions (e.g. button size/severity/variant), add `src/types/app/ui/index.ts` (or `types/shared/ui`) with shared interfaces/types and import in components. Keep types logic-free.

---

## 4. App.vue change

- In `src/App.vue`: Import `UIApp` and replace the root with `<UIApp><router-view /></UIApp>`.

---

## 5. Conventions checklist

- Each component: `components/ui/<component-name>/index.vue`, PascalCase name in `name` option.
- Props: dedicated interface + `defineProps<T>()`; no `any`.
- Tailwind only; no inline styles or scoped CSS unless necessary.
- Presentational only: no store, no API calls, no business logic.
- Optional: add `ui` to `types/app` or `types/shared` for shared UI prop types.

---

## File summary

| Component   | File path                                |
| ----------- | ---------------------------------------- |
| UIApp       | `src/components/ui/app/index.vue`        |
| UIButton    | `src/components/ui/button/index.vue`     |
| UICard      | `src/components/ui/card/index.vue`      |
| UIContainer | `src/components/ui/container/index.vue`  |
| UIHeadline  | `src/components/ui/headline/index.vue`   |
| UIError     | `src/components/ui/error/index.vue`      |
| UILoading   | `src/components/ui/loading/index.vue`    |
| UIProgress  | `src/components/ui/progress/index.vue`   |
| Plan doc    | `plan/components/ui/index.md`            |
