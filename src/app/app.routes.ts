import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: '', canActivate: [AuthGuard], loadComponent: () => import('./tasks-list/tasks-list.component').then(m => m.TasksListComponent) },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];
