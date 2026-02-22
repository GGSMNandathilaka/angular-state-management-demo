# Angular State Management Bootcamp

A hands-on Angular 19 demo that implements the **same task manager feature four times** — once with each major state management approach — so you can compare them side-by-side.

## What We Built

A tabbed single-page app where every tab delivers an identical task manager UI:

- Display tasks with title, completion status, and priority (low / medium / high)
- Add tasks via an inline form (title + priority)
- Toggle tasks between complete and incomplete
- Filter tasks by All, Active, or Completed
- Show a derived counter: _"X of Y tasks completed"_
- Simulate async API loading with a 500 ms delay

The only thing that changes between tabs is **how state is managed**.

## The Four Approaches

| Route | Approach | Key Concepts |
|---|---|---|
| `/behaviorsubject` | **BehaviorSubject Service** | `BehaviorSubject`, `combineLatest`, `async` pipe — the classic RxJS pattern |
| `/pure-signals` | **Pure Angular Signals** | `signal()`, `computed()`, `update()` — zero extra packages |
| `/ngrx-store` | **NgRx Store** | `createFeature`, `createReducer`, `createEffect`, `createActionGroup`, selectors — full Redux pattern |
| `/signal-store` | **NgRx SignalStore** | `signalStore`, `withState`, `withComputed`, `withMethods`, `rxMethod` — reactive store without boilerplate |

## Project Structure

```
state-mgt-demo/
├── src/app/
│   ├── shared/
│   │   ├── task.model.ts            # Task interface & TaskFilter type
│   │   ├── task-api.service.ts      # Fake API returning mock data with delay(500)
│   │   └── task-list.component.ts   # Presentational component (shared across all tabs)
│   │
│   ├── behaviorsubject/
│   │   ├── task-bs.service.ts       # State managed with BehaviorSubject streams
│   │   └── behaviorsubject.component.ts
│   │
│   ├── pure-signals/
│   │   ├── task-signal.service.ts   # State managed with Angular signals + computed
│   │   └── pure-signals.component.ts
│   │
│   ├── ngrx-store/
│   │   ├── task.actions.ts          # Action group (createActionGroup)
│   │   ├── task.feature.ts          # Feature state + reducer (createFeature)
│   │   ├── task.effects.ts          # Side effects for async loading
│   │   ├── task.selectors.ts        # Derived state (createSelector)
│   │   └── ngrx-store.component.ts
│   │
│   ├── signal-store/
│   │   ├── task-signal.store.ts     # SignalStore (withState, withComputed, withMethods, rxMethod)
│   │   └── signal-store.component.ts
│   │
│   ├── app.routes.ts                # 4 routes + redirect
│   ├── app.config.ts                # Providers (router, NgRx store, effects)
│   └── app.component.ts             # Tab bar shell
```

## How Each Approach Compares

### BehaviorSubject Service
- Uses `BehaviorSubject` for each piece of state (`tasks`, `filter`, `loading`)
- Derives filtered tasks with `combineLatest` + `map`
- Mutates state via `.next()` and `.getValue()`
- Components subscribe with the `async` pipe

### Pure Angular Signals
- Uses `signal()` for each piece of state
- Derives filtered tasks with `computed()`
- Mutates state via `.set()` and `.update()`
- No extra dependencies — built into Angular 19

### NgRx Store (Redux Pattern)
- Actions defined with `createActionGroup`
- Reducer built with `createFeature` + `createReducer` + `on()`
- Async loading handled by `createEffect` in a separate `TaskEffects` class
- Derived state via `createSelector`
- Components dispatch actions and select state from the global store

### NgRx SignalStore
- Single `signalStore()` call replaces actions, reducer, effects, and selectors
- `withState` defines initial state
- `withComputed` replaces selectors
- `withMethods` replaces actions + reducer cases
- `rxMethod` bridges RxJS for async operations (replaces effects)

## Tech Stack

- **Angular** 19.2 (standalone components, new `@if` / `@for` control flow)
- **NgRx Store** 19.2 (`@ngrx/store`, `@ngrx/effects`)
- **NgRx SignalStore** 19.2 (`@ngrx/signals`)
- **RxJS** 7.8
- **TypeScript** 5.7

## Getting Started

```bash
cd state-mgt-demo
npm install
ng serve
```

Open [http://localhost:4200](http://localhost:4200) — the app defaults to the BehaviorSubject tab. Click through the tabs to compare each approach.
