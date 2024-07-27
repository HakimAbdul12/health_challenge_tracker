import { Routes } from '@angular/router';
import { AddWorkoutComponent } from './pages/add-workout/add-workout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', component: AddWorkoutComponent },
  { path: 'dashboard', component: DashboardComponent }
];
