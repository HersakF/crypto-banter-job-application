# App Components Plan

## Scope

Create feature components under `components/app/` that render all components for defined types. Each component uses the corresponding app type and getter composable from [composables/app](src/composables/app). Follow .cursorrules: Composition API, `<script setup lang="ts" name="ComponentName">`, inline `defineProps` (no Props interface), section comments, Tailwind-only scoped CSS, and `template v-if` (not `v-if` on the element). No business logic or API calls in components; use composable getters only.

## Location and naming

| Component        | Path                               | Script name        |
|-----------------|-------------------------------------|--------------------|
| Challenges list | `components/app/challenge/index.vue` | `AppChallenges`    |
| Day card        | `components/app/day/index.vue`       | `AppChallengesDay` |
| Task row        | `components/app/task/index.vue`      | `AppChallengesTask` |

## Script section order (per .cursorrules)

1. **Components** — UI and app subcomponents from `@/components/ui/*` and `@/components/app/*`.
2. **Types** — App types from `@/types/app/*`.
3. **Composables** — App getter composables from `@/composables/app/*/use*.ts`.
4. **Props** — `defineProps<{ ... }>();` inline (no separate Props interface).
5. **Emits** — `defineEmits<{ ... }>();` when the component emits.
6. **Computed** — when needed (e.g. derived state from props + getters).
7. **Methods** — when needed (e.g. emit handlers).

Use section comments (`// Components`, `// Types`, etc.) as in the existing app components.

## 1. AppChallenges — `components/app/challenge/index.vue`

**Role:** Root challenges view: list of challenges, each with header and a list of day cards.

**Imports:**
- Components: `UIContainer`, `UIHeadline`, `UICard` from `@/components/ui/*`; `AppChallengesDay` from `@/components/app/day/index.vue`.
- Type: `AppChallenge` from `@/types/app/challenge`.
- Composable: `useAppChallenges` from `@/composables/app/challenges/useChallenges`; destructure `getId`, `getTitle`, `getDescription`, `getDays`.

**Props:** `challenges: AppChallenge[]` (required).

**Emits:** `onNext: [challengeIndex: number, dayIndex: number]`.

**Methods:** `onDayNext(challengeIndex, dayIndex)` — calls `emit("onNext", challengeIndex, dayIndex)`.

**Template structure:**
- Root: `<UIContainer>`.
- Inner: wrapper div (e.g. `.challenges-page`), then `UIHeadline` (title "Challenges"), then `UICard`.
- Inside card: `.challenges` → `v-for="(challenge, challengeIndex) in challenges"` with `:key="getId(challenge)"`.
- Per challenge: `.challenge` with `.challenge__header` (title, description via getters) and `.challenge__days`.
- Days: `AppChallengesDay` with `v-for="(day, dayIndex) in getDays(challenge)"`, `:key="day.id"`, `:index="dayIndex"`, `:day="day"`, `@on-next="onDayNext(challengeIndex, dayIndex)"`.

**Styles:** Scoped; `@reference "@/assets/style/main.css"`. BEM-like classes (`.challenges`, `.challenge`, `.challenge__header`, `.challenge__header-title`, `.challenge__header-description`, `.challenge__days`) with Tailwind `@apply`. Grid layout for list and days (e.g. `md:grid-cols-2` for days).

---

## 2. AppChallengesDay — `components/app/day/index.vue`

**Role:** Single day card: index, title, description, progress bar, task list, action button, and optional overlay messages (completed / locked).

**Imports:**
- Vue: `computed` from `"vue"`.
- Components: `AppChallengesTask` from `@/components/app/task/index.vue`; `UIButton`, `UIProgress` from `@/components/ui/*`.
- Type: `AppDay` from `@/types/app/day`.
- Composable: `useAppDays` from `@/composables/app/days/useDays`; destructure `getTitle`, `getDescription`, `getIsActive`, `getProgress`, `getTasks`.

**Props:** `day: AppDay`, `index: number`.

**Emits:** `onNext: []` (no payload).

**Computed:**
- `dayIndex` — `props.index + 1`.
- `isInProgress` — `getIsActive(day) && getProgress(day) > 0`.
- `isCompleted` — `!getIsActive(day) && getProgress(day) === 100`.
- `isLocked` — `!getIsActive(day) && getProgress(day) === 0`.

**Template structure:**
- Root: `.challenge-day` with dynamic class `'challenge-day--is-active': getIsActive(day)`.
- Sections: `.information` (index badge + `.content` with headline and `UIProgress`), `.tasks` (list of `AppChallengesTask`), `.action` (UIButton).
- Index: `.index` with `dayIndex` and "Day", class `'index--is-active': getIsActive(day)`.
- Headline: `getTitle(day)`, `getDescription(day)`; progress: `:value="getProgress(day)"`.
- Tasks: `v-for="task in getTasks(day)"` with `:key="task.id"` and `:task="task"`.
- Button: `UIButton` with `severity="primary"` and `size="sm"`, `@on-click="() => emit('onNext')"`, label from `isInProgress ? "Continue" : "Start"`.
- Overlays: `<template v-if="isCompleted">` and `<template v-if="isLocked">` each wrapping a `.message` div (e.g. "Completed" / "Locked"). Do not put `v-if` on the inner element; use `template v-if` then the div.

**Styles:** Scoped; reference main.css. Classes: `.challenge-day`, `.information`, `.index`, `.index--is-active`, `.content`, `.headline`, `.headline__title`, `.headline__description`, `.tasks`, `.action`, `.message`, `.message--is-completed`, `.message--is-locked`. Use Tailwind for layout, borders, and overlays (e.g. absolute inset overlay for messages).

---

## 3. AppChallengesTask — `components/app/task/index.vue`

**Role:** Single task row: status icon (completed check or dot), type label, title, description.

**Imports:**
- Type: `AppTask` from `@/types/app/task`.
- Composable: `useAppTasks` from `@/composables/app/tasks/useTasks`; destructure `getTitle`, `getDescription`, `getType`, `getIsCompleted`.

**Props:** `task: AppTask`.

**Emits:** None.

**Template structure:**
- Root: `.challenge-task` with dynamic class `'challenge-task--is-completed': getIsCompleted(task)`.
- Status: `.status` with same completed class; inside use `<template v-if="getIsCompleted(task)">` with check icon (e.g. span "✓") and `<template v-else>` with dot icon. Do not put `v-if` on the span; wrap in template.
- Content: `.content` with `.type` (getType), `.title` (getTitle), `.description` (getDescription).

**Styles:** Scoped; reference main.css. Classes: `.challenge-task`, `.challenge-task--is-completed`, `.status`, `.status--is-completed`, `.icon-check`, `.icon-dot`, `.content`, `.type`, `.title`, `.description`. Tailwind for flex/grid, borders, and completed state (e.g. green for completed).

---

## Conventions summary

- **Types:** Use `AppChallenge`, `AppDay`, `AppTask` from `@/types/app/*`; no API types in components.
- **Data access:** Only via composables `useAppChallenges`, `useAppDays`, `useAppTasks`; call getters with the entity (e.g. `getTitle(day)`).
- **Conditional rendering:** Always `<template v-if="...">` then the element; never `<p v-if="...">`.
- **Props:** Inline `defineProps<{ ... }>();`; no Props interface.
- **UI components:** Use existing UI from `@/components/ui/*` (e.g. UIButton with `severity` and `size`, not `variant`/`type` for style; emit is `onClick` → listen as `@on-click`).
- **Paths:** App subcomponents imported from `@/components/app/<entity>/index.vue` (challenge, day, task).

---

## Files to create or align

| File | Purpose |
|------|--------|
| `components/app/challenge/index.vue` | Challenges list page: headline, card, list of challenges with days and onNext emit. |
| `components/app/day/index.vue` | Day card: index, headline, progress, task list, button, completed/locked overlays. |
| `components/app/task/index.vue` | Task row: status icon, type, title, description. |

This plan reflects the current structure and behavior of [src/components/app](src/components/app) so it can be used to recreate or maintain these components consistently.
