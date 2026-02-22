import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { Task, TaskFilter } from '../shared/task.model';
import { TaskApiService } from '../shared/task-api.service';

@Injectable({ providedIn: 'root' })
export class TaskBsService {
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  private filterSubject = new BehaviorSubject<TaskFilter>('all');
  private loadingSubject = new BehaviorSubject<boolean>(false);

  readonly tasks$ = this.tasksSubject.asObservable();
  readonly filter$ = this.filterSubject.asObservable();
  readonly loading$ = this.loadingSubject.asObservable();

  readonly filteredTasks$ = combineLatest([this.tasks$, this.filter$]).pipe(
    map(([tasks, filter]) => {
      if (filter === 'active') return tasks.filter(t => !t.completed);
      if (filter === 'completed') return tasks.filter(t => t.completed);
      return tasks;
    })
  );

  constructor(private api: TaskApiService) {}

  loadTasks() {
    this.loadingSubject.next(true);
    this.api.getTasks().subscribe(tasks => {
      this.tasksSubject.next(tasks);
      this.loadingSubject.next(false);
    });
  }

  addTask(title: string, priority: 'low' | 'medium' | 'high') {
    const task: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      priority,
    };
    this.tasksSubject.next([...this.tasksSubject.getValue(), task]);
  }

  toggleTask(id: string) {
    const tasks = this.tasksSubject.getValue().map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    this.tasksSubject.next(tasks);
  }

  setFilter(filter: TaskFilter) {
    this.filterSubject.next(filter);
  }
}
