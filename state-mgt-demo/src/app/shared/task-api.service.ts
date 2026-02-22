import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Task } from './task.model';

@Injectable({ providedIn: 'root' })
export class TaskApiService {
  private mockTasks: Task[] = [
    { id: '1', title: 'Set up project structure', completed: true, priority: 'high' },
    { id: '2', title: 'Design component API', completed: false, priority: 'medium' },
    { id: '3', title: 'Write unit tests', completed: false, priority: 'high' },
    { id: '4', title: 'Update documentation', completed: false, priority: 'low' },
    { id: '5', title: 'Review pull request', completed: true, priority: 'medium' },
  ];

  getTasks(): Observable<Task[]> {
    return of(this.mockTasks.map(t => ({ ...t }))).pipe(delay(500));
  }
}
