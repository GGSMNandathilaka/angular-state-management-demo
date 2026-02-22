import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { TaskApiService } from '../shared/task-api.service';
import { TaskActions } from './task.actions';

@Injectable()
export class TaskEffects {
  private actions$ = inject(Actions);
  private api = inject(TaskApiService);

  readonly loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.loadTasks),
      switchMap(() =>
        this.api.getTasks().pipe(
          map((tasks) => TaskActions.loadTasksSuccess({ tasks }))
        )
      )
    )
  );
}