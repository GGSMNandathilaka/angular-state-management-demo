import { computed, inject } from '@angular/core';
import {
  signalStore,
  withState,
  withComputed,
  withMethods,
  patchState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { Task, TaskFilter } from '../shared/task.model';
import { TaskApiService } from '../shared/task-api.service';

type TaskStoreState = {
  tasks: Task[];
  filter: TaskFilter;
  loading: boolean;
};

const initialState: TaskStoreState = {
  tasks: [],
  filter: 'all' as TaskFilter,
  loading: false,
};

export const TaskSignalStore = signalStore(
  { providedIn: 'root' },

  // 1. Define state (replaces the reducer's initialState)
  withState(initialState),

  // 2. Derived state (replaces selectors)
  withComputed(({ tasks, filter }) => ({
    filteredTasks: computed(() => {
      const f = filter();
      const t = tasks();
      if (f === 'active') return t.filter((x) => !x.completed);
      if (f === 'completed') return t.filter((x) => x.completed);
      return t;
    }),
  })),

  // 3. Methods (replaces actions + reducer cases + effects — all in one place)
  withMethods((store) => {
    const api = inject(TaskApiService);

    return {
      addTask(title: string, priority: 'low' | 'medium' | 'high') {
        patchState(store, {
          tasks: [
            ...store.tasks(),
            { id: crypto.randomUUID(), title, completed: false, priority },
          ],
        });
      },

      toggleTask(id: string) {
        patchState(store, {
          tasks: store.tasks().map((t) =>
            t.id === id ? { ...t, completed: !t.completed } : t
          ),
        });
      },

      setFilter(filter: TaskFilter) {
        patchState(store, { filter });
      },

      // rxMethod bridges observables — replaces Effects
      loadTasks: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { loading: true })),
          switchMap(() =>
            api.getTasks().pipe(
              tap((tasks) => patchState(store, { tasks, loading: false }))
            )
          )
        )
      ),
    };
  })
);
