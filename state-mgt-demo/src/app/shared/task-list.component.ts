import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task, TaskFilter } from './task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="task-controls">
      <form class="add-form" (ngSubmit)="onAdd()">
        <input
          type="text"
          placeholder="New task title…"
          [(ngModel)]="newTitle"
          name="title"
          required
        />
        <select [(ngModel)]="newPriority" name="priority">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button type="submit" [disabled]="!newTitle.trim()">Add</button>
      </form>

      <div class="filter-group">
        <button
          [class.active]="filter === 'all'"
          (click)="filterChange.emit('all')"
        >All</button>
        <button
          [class.active]="filter === 'active'"
          (click)="filterChange.emit('active')"
        >Active</button>
        <button
          [class.active]="filter === 'completed'"
          (click)="filterChange.emit('completed')"
        >Completed</button>
      </div>

      <p class="counter">{{ completedCount }} of {{ tasks.length }} tasks completed</p>
    </div>

    @if (loading) {
      <div class="loading">Loading tasks…</div>
    } @else {
      <ul class="task-list">
        @for (task of tasks; track task.id) {
          <li [class.completed]="task.completed">
            <label>
              <input
                type="checkbox"
                [checked]="task.completed"
                (change)="toggle.emit(task.id)"
              />
              <span class="title">{{ task.title }}</span>
            </label>
            <span class="badge priority-{{ task.priority }}">{{ task.priority }}</span>
          </li>
        } @empty {
          <li class="empty">No tasks to display.</li>
        }
      </ul>
    }
  `,
  styles: [`
    .task-controls { margin-bottom: 16px; }

    .add-form {
      display: flex;
      gap: 8px;
      margin-bottom: 12px;
    }
    .add-form input[type="text"] {
      flex: 1;
      padding: 8px 12px;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      font-size: 14px;
    }
    .add-form select {
      padding: 8px 12px;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      font-size: 14px;
    }
    .add-form button {
      padding: 8px 20px;
      background: #2563eb;
      color: #fff;
      border: none;
      border-radius: 6px;
      font-size: 14px;
      cursor: pointer;
    }
    .add-form button:disabled {
      opacity: 0.5;
      cursor: default;
    }

    .filter-group {
      display: flex;
      gap: 4px;
      margin-bottom: 8px;
    }
    .filter-group button {
      padding: 6px 16px;
      border: 1px solid #d1d5db;
      background: #fff;
      border-radius: 6px;
      font-size: 13px;
      cursor: pointer;
    }
    .filter-group button.active {
      background: #2563eb;
      color: #fff;
      border-color: #2563eb;
    }

    .counter {
      font-size: 13px;
      color: #6b7280;
      margin: 0;
    }

    .loading {
      text-align: center;
      padding: 32px;
      color: #6b7280;
    }

    .task-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .task-list li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 12px;
      border-bottom: 1px solid #f3f4f6;
    }
    .task-list li.completed .title {
      text-decoration: line-through;
      color: #9ca3af;
    }
    .task-list li label {
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
    }
    .task-list li.empty {
      color: #9ca3af;
      justify-content: center;
      padding: 24px;
    }

    .badge {
      font-size: 11px;
      font-weight: 600;
      padding: 2px 10px;
      border-radius: 12px;
      text-transform: uppercase;
    }
    .priority-high { background: #fee2e2; color: #dc2626; }
    .priority-medium { background: #fef3c7; color: #d97706; }
    .priority-low { background: #dbeafe; color: #2563eb; }
  `],
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];
  @Input() filter: TaskFilter = 'all';
  @Input() loading = false;

  @Output() toggle = new EventEmitter<string>();
  @Output() add = new EventEmitter<{ title: string; priority: 'low' | 'medium' | 'high' }>();
  @Output() filterChange = new EventEmitter<TaskFilter>();

  newTitle = '';
  newPriority: 'low' | 'medium' | 'high' = 'medium';

  get completedCount(): number {
    return this.tasks.filter(t => t.completed).length;
  }

  onAdd() {
    if (!this.newTitle.trim()) return;
    this.add.emit({ title: this.newTitle.trim(), priority: this.newPriority });
    this.newTitle = '';
    this.newPriority = 'medium';
  }
}
