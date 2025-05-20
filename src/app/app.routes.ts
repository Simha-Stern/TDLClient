import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: '', canActivate: [AuthGuard], loadComponent: () => import('./app.component').then(m => m.AppComponent) },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];
