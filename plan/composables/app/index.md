# App composables plan (getter pattern)

## Scope

Create one composable per app type under `composables/app/<entity>/`. Each composable exposes **getter methods** that take an entity instance and return a property value with a safe fallback. No API calls; pure helpers for reading typed app data.

## Location and naming

| App type       | Types source                    | Composable path                              | Export name      |
|----------------|----------------------------------|----------------------------------------------|------------------|
| `AppChallenge` | [types/app/challenge](src/types/app/challenge/index.ts) | `composables/app/challenges/useChallenges.ts` | `useAppChallenges` |
| `AppDay`       | [types/app/day](src/types/app/day/index.ts)             | `composables/app/days/useDays.ts`             | `useAppDays`     |
| `AppTask`      | [types/app/task](src/types/app/task/index.ts)           | `composables/app/tasks/useTasks.ts`          | `useAppTasks`    |

## Pattern per composable

1. **Section comments:** `// Types` at top, then `// Methods` before the getter functions.
2. **Imports:** Only the app type: `import type { AppX } from "@/types/app/<entity>";`
3. **Export:** One function `useAppX()` that returns an object of getter methods.
4. **Getters:** For each property of the type, one method `get<Prop>(value: AppX): ReturnType` that returns `value.prop ?? fallback`.
5. **Fallbacks:** numbers → `0`, strings → `"-"`, booleans → `false`, date strings → `null`, optional arrays → `[]`.

No Props, Emits, Store, Composables, Local state, or Lifecycle hooks; only Types and Methods.

## 1. useAppChallenges — `composables/app/challenges/useChallenges.ts`

**Type:** `AppChallenge` from [types/app/challenge](src/types/app/challenge/index.ts).

**Properties and getters:**

| Property     | Getter         | Return type                    | Fallback |
|-------------|----------------|---------------------------------|----------|
| `id`        | `getId`        | `number`                        | `0`      |
| `title`     | `getTitle`     | `string`                       | `"-"`    |
| `description` | `getDescription` | `string`                    | `"-"`    |
| `duration`  | `getDuration`  | `string`                       | `"-"`    |
| `is_active` | `getIsActive`  | `boolean`                      | `false`  |
| `is_completed` | `getIsCompleted` | `boolean`                  | `false`  |
| `created_at` | `getCreatedAt` | `string \| null`              | `null`   |
| `updated_at` | `getUpdatedAt` | `string \| null`              | `null`   |
| `days?`     | `getDays`      | `NonNullable<AppChallenge["days"]>` | `[]` |

**Return:** `{ getId, getTitle, getDescription, getDuration, getIsActive, getIsCompleted, getCreatedAt, getUpdatedAt, getDays }`

## 2. useAppDays — `composables/app/days/useDays.ts`

**Type:** `AppDay` from [types/app/day](src/types/app/day/index.ts).

**Properties and getters:**

| Property       | Getter           | Return type              | Fallback |
|----------------|------------------|--------------------------|----------|
| `id`           | `getId`          | `number`                 | `0`      |
| `challenge_id` | `getChallengeId` | `number`                 | `0`      |
| `title`        | `getTitle`       | `string`                 | `"-"`    |
| `description`  | `getDescription` | `string`                 | `"-"`    |
| `is_active`    | `getIsActive`    | `boolean`                | `false`  |
| `progress`     | `getProgress`    | `number`                 | `0`      |
| `created_at`   | `getCreatedAt`   | `string \| null`         | `null`   |
| `updated_at`   | `getUpdatedAt`   | `string \| null`         | `null`   |
| `tasks?`       | `getTasks`       | `NonNullable<AppDay["tasks"]>` | `[]` |

**Return:** `{ getId, getChallengeId, getTitle, getDescription, getIsActive, getProgress, getCreatedAt, getUpdatedAt, getTasks }`

## 3. useAppTasks — `composables/app/tasks/useTasks.ts`

**Type:** `AppTask` from [types/app/task](src/types/app/task/index.ts).

**Properties and getters:**

| Property     | Getter           | Return type      | Fallback |
|-------------|------------------|------------------|----------|
| `id`        | `getId`          | `number`         | `0`      |
| `day_id`    | `getDayId`       | `number`         | `0`      |
| `title`     | `getTitle`       | `string`         | `"-"`    |
| `description` | `getDescription` | `string`       | `"-"`    |
| `type`      | `getType`        | `string`         | `"-"`    |
| `is_completed` | `getIsCompleted` | `boolean`     | `false`  |
| `created_at` | `getCreatedAt`   | `string \| null` | `null`   |
| `updated_at` | `getUpdatedAt`   | `string \| null` | `null`   |

**Return:** `{ getId, getDayId, getTitle, getDescription, getType, getIsCompleted, getCreatedAt, getUpdatedAt }`

## Example (challenges)

```ts
// Types
import type { AppChallenge } from "@/types/app/challenge";

export function useAppChallenges() {
  // Methods
  function getId(value: AppChallenge): number {
    return value.id ?? 0;
  }

  function getTitle(value: AppChallenge): string {
    return value.title ?? "-";
  }

  // ... one getX per property ...

  function getDays(value: AppChallenge): NonNullable<AppChallenge["days"]> {
    return value.days ?? [];
  }

  return {
    getId,
    getTitle,
    getDescription,
    getDuration,
    getIsActive,
    getIsCompleted,
    getCreatedAt,
    getUpdatedAt,
    getDays,
  };
}
```

## Files to create or align

| File | Export | Purpose |
|------|--------|---------|
| `composables/app/challenges/useChallenges.ts` | `useAppChallenges` | Getters for `AppChallenge` |
| `composables/app/days/useDays.ts`             | `useAppDays`       | Getters for `AppDay`      |
| `composables/app/tasks/useTasks.ts`           | `useAppTasks`      | Getters for `AppTask`     |

## Conventions

- One composable per app type; one getter per property.
- Use section comments: `// Types`, `// Methods`.
- No store, no API, no local state; only pure getters.
- Fallbacks keep templates and callers safe when values are missing.
