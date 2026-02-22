import { createSelector } from '@ngrx/store';
import { selectTasks, selectFilter } from './task.feature';

export const selectFilteredTasks = createSelector(
  selectTasks,
  selectFilter,
  (tasks, filter) => {
    if (filter === 'active') return tasks.filter((t) => !t.completed);
    if (filter === 'completed') return tasks.filter((t) => t.completed);
    return tasks;
  }
);