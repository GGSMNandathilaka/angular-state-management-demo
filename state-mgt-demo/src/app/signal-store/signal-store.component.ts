import { Component, inject, OnInit } from '@angular/core';
import { TaskListComponent } from '../shared/task-list.component';
import { TaskSignalStore } from './task-signal.store';

@Component({
  selector: 'app-signal-store',
  standalone: true,
  imports: [TaskListComponent],
  template: `
    <div class="tab-page">
      <h2>NgRx SignalStore</h2>
      <p class="description">withState + withComputed + withMethods + rxMethod — NgRx without the boilerplate.</p>
      <app-task-list
        [tasks]="store.filteredTasks()"
        [filter]="store.filter()"
        [loading]="store.loading()"
        (toggle)="store.toggleTask($event)"
        (add)="store.addTask($event.title, $event.priority)"
        (filterChange)="store.setFilter($event)"
      />
    </div>
  `,
})
export class SignalStoreComponent implements OnInit {
  readonly store = inject(TaskSignalStore);

  ngOnInit() {
    this.store.loadTasks();
  }
}
