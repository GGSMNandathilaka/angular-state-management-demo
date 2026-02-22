import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { routes } from './app.routes';
import { taskFeature } from './ngrx-store/task.feature';
import { TaskEffects } from './ngrx-store/task.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({ [taskFeature.name]: taskFeature.reducer }),
    provideEffects(TaskEffects),
  ],
};
