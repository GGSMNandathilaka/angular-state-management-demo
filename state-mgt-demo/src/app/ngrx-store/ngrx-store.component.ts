import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { TaskListComponent } from '../shared/task-list.component';
import { TaskActions } from './task.actions';
import { selectFilter, selectLoading } from './task.feature';
import { selectFilteredTasks } from './task.selectors';

@Component({
  selector: 'app-ngrx-store',
  standalone: true,
  imports: [AsyncPipe, TaskListComponent],
  template: `
    <div class="tab-page">
      <h2>NgRx Store</h2>
      <p class="description">Full Redux pattern — Actions, createFeature reducer, Effects, and memoized selectors.</p>
      <app-task-list
        [tasks]="(filteredTasks$ | async) ?? []"
        [filter]="(filter$ | async) ?? 'all'"
        [loading]="(loading$ | async) ?? false"
        (toggle)="onToggle($event)"
        (add)="onAdd($event)"
        (filterChange)="onFilterChange($event)"
      />
    </div>
  `,
})
export class NgrxStoreComponent implements OnInit {
  private store = inject(Store);

  filteredTasks$ = this.store.select(selectFilteredTasks);
  filter$ = this.store.select(selectFilter);
  loading$ = this.store.select(selectLoading);

  ngOnInit() {
    this.store.dispatch(TaskActions.loadTasks());
  }

  onToggle(id: string) {
    this.store.dispatch(TaskActions.toggleTask({ id }));
  }

  onAdd(event: { title: string; priority: 'low' | 'medium' | 'high' }) {
    this.store.dispatch(TaskActions.addTask(event));
  }

  onFilterChange(filter: 'all' | 'active' | 'completed') {
    this.store.dispatch(TaskActions.setFilter({ filter }));
  }
}