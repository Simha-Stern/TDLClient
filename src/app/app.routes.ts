import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AddTaskFormComponent } from './add-task-form/add-task-form.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { EditTaskComponent } from './edit-task/edit-task.component';

export const routes: Routes = [
  { path: '', component: TasksListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'add-task', component: AddTaskFormComponent },
  { path: 'edit-task/:id', component: EditTaskComponent },
];
