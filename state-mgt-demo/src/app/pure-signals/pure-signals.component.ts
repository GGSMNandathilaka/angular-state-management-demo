import { Component, OnInit } from '@angular/core';
import { TaskListComponent } from '../shared/task-list.component';
import { TaskSignalService } from './task-signal.service';

@Component({
  selector: 'app-pure-signals',
  standalone: true,
  imports: [TaskListComponent],
  template: `
    <div class="tab-page">
      <h2>Pure Angular Signals</h2>
      <p class="description">signal() + computed() in a service — no extra packages, fully reactive.</p>
      <app-task-list
        [tasks]="service.filteredTasks()"
        [filter]="service.filter()"
        [loading]="service.loading()"
        (toggle)="service.toggleTask($event)"
        (add)="service.addTask($event.title, $event.priority)"
        (filterChange)="service.setFilter($event)"
      />
    </div>
  `,
})
export class PureSignalsComponent implements OnInit {
  constructor(readonly service: TaskSignalService) {}

  ngOnInit() {
    this.service.loadTasks();
  }
}
