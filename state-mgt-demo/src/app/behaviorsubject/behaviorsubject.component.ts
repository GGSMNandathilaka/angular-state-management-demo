import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { TaskListComponent } from '../shared/task-list.component';
import { TaskBsService } from './task-bs.service';

@Component({
  selector: 'app-behaviorsubject',
  standalone: true,
  imports: [AsyncPipe, TaskListComponent],
  template: `
    <div class="tab-page">
      <h2>BehaviorSubject Service</h2>
      <p class="description">Classic observable pattern using BehaviorSubject + combineLatest for derived state.</p>
      <app-task-list
        [tasks]="(service.filteredTasks$ | async) ?? []"
        [filter]="(service.filter$ | async) ?? 'all'"
        [loading]="(service.loading$ | async) ?? false"
        (toggle)="service.toggleTask($event)"
        (add)="service.addTask($event.title, $event.priority)"
        (filterChange)="service.setFilter($event)"
      />
    </div>
  `,
})
export class BehaviorsubjectComponent implements OnInit {
  constructor(readonly service: TaskBsService) {}

  ngOnInit() {
    this.service.loadTasks();
  }
}
