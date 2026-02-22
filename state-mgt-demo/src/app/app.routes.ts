import { Routes } from '@angular/router';
import { BehaviorsubjectComponent } from './behaviorsubject/behaviorsubject.component';
import { PureSignalsComponent } from './pure-signals/pure-signals.component';
import { NgrxStoreComponent } from './ngrx-store/ngrx-store.component';
import { SignalStoreComponent } from './signal-store/signal-store.component';

export const routes: Routes = [
  { path: '', redirectTo: 'behaviorsubject', pathMatch: 'full' },
  { path: 'behaviorsubject', component: BehaviorsubjectComponent },
  { path: 'pure-signals', component: PureSignalsComponent },
  { path: 'ngrx-store', component: NgrxStoreComponent },
  { path: 'signal-store', component: SignalStoreComponent },
];
