import { createFeature, createReducer, on } from '@ngrx/store';
import { Task, TaskFilter } from '../shared/task.model';
import { TaskActions } from './task.actions';

export interface TaskState {
  tasks: Task[];
  filter: TaskFilter;
  loading: boolean;
}

const initialState: TaskState = {
  tasks: [],
  filter: 'all',
  loading: false,
};

export const taskFeature = createFeature({
  name: 'tasks',
  reducer: createReducer(
    initialState,

    on(TaskActions.loadTasks, (state) => ({
      ...state,
      loading: true,
    })),

    on(TaskActions.loadTasksSuccess, (state, { tasks }) => ({
      ...state,
      tasks,
      loading: false,
    })),

    on(TaskActions.addTask, (state, { title, priority }) => ({
      ...state,
      tasks: [
        ...state.tasks,
        { id: crypto.randomUUID(), title, completed: false, priority },
      ],
    })),

    on(TaskActions.toggleTask, (state, { id }) => ({
      ...state,
      tasks: state.tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      ),
    })),

    on(TaskActions.setFilter, (state, { filter }) => ({
      ...state,
      filter,
    }))
  ),
});

export const {
  selectTasks,
  selectFilter,
  selectLoading,
} = taskFeature;
