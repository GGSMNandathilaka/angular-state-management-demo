import { computed, Injectable, signal } from '@angular/core';
import { Task, TaskFilter } from '../shared/task.model';
import { TaskApiService } from '../shared/task-api.service';

@Injectable({ providedIn: 'root' })
export class TaskSignalService {
  private readonly _tasks = signal<Task[]>([]);
  private readonly _filter = signal<TaskFilter>('all');
  private readonly _loading = signal(false);

  readonly tasks = this._tasks.asReadonly();
  readonly filter = this._filter.asReadonly();
  readonly loading = this._loading.asReadonly();

  readonly filteredTasks = computed(() => {
    const filter = this._filter();
    const tasks = this._tasks();
    if (filter === 'active') return tasks.filter(t => !t.completed);
    if (filter === 'completed') return tasks.filter(t => t.completed);
    return tasks;
  });

  constructor(private api: TaskApiService) {}

  loadTasks() {
    this._loading.set(true);
    this.api.getTasks().subscribe(tasks => {
      this._tasks.set(tasks);
      this._loading.set(false);
    });
  }

  addTask(title: string, priority: 'low' | 'medium' | 'high') {
    const task: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      priority,
    };
    this._tasks.update(tasks => [...tasks, task]);
  }

  toggleTask(id: string) {
    this._tasks.update(tasks =>
      tasks.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  setFilter(filter: TaskFilter) {
    this._filter.set(filter);
  }
}