import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Task, TaskFilter } from '../shared/task.model';

export const TaskActions = createActionGroup({
  source: 'Tasks',
  events: {
    'Load Tasks': emptyProps(),
    'Load Tasks Success': props<{ tasks: Task[] }>(),
    'Add Task': props<{ title: string; priority: 'low' | 'medium' | 'high' }>(),
    'Toggle Task': props<{ id: string }>(),
    'Set Filter': props<{ filter: TaskFilter }>(),
  },
});