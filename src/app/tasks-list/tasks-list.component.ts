import { Component, OnInit } from '@angular/core';
import { TaskService, Task } from '../task.service';
import { AuthService } from '../auth.service';

import { CommonModule } from '@angular/common';
import { LogOutComponent } from '../log-out/log-out.component';
import { AddTaskButtonComponent } from '../add-task-button/add-task-button.component';

@Component({
  selector: 'app-tasks-list',
  imports: [CommonModule, LogOutComponent, AddTaskButtonComponent],
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
      this.taskService.getTasksForUserApi().subscribe({
        next: (tasks) => {
          console.log("🚀 ~ TasksListComponent ~ this.taskService.getTasksForUserApi ~ tasks:", tasks)
          this.tasks = tasks;
        },
        error: (err) => {
          console.log("🚀 ~ TasksListComponent ~ this.taskService.getTasksForUserApi ~ err:", err)
          this.error = 'Failed to load tasks';
        }
      });
    } else {
      this.error = 'User not logged in';
    }
  }

  onTaskCompletedChange(task: Task, event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input) return;
    const completed = input.checked;
    const updatedTask = { ...task, completed };
    this.taskService.updateTaskApi(updatedTask).subscribe({
      next: () => {
        task.completed = completed;
      },
      error: () => {
        this.error = 'Failed to update task status';
      }
    });
  }
}
