import { Component, OnInit } from '@angular/core';
import { TaskService, Task } from '../task.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-tasks-list',
  imports: [],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css'
})
export class TasksListComponent implements OnInit {
  tasks: Task[] = [];
  error: string | null = null;

  constructor(
    private taskService: TaskService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getCurrentUserId?.();
    if (userId) {
      this.taskService.getTasksForUserApi(userId).subscribe({
        next: (tasks) => {
          this.tasks = tasks;
        },
        error: (err) => {
          this.error = 'Failed to load tasks';
        }
      });
    } else {
      this.error = 'User not logged in';
    }
  }
}
