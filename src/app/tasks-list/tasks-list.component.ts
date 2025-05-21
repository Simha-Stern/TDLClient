import { Component, OnInit } from '@angular/core';
import { TaskService, Task } from '../task.service';
import { AuthService } from '../auth.service';

import { CommonModule } from '@angular/common';
import { LogOutComponent } from '../log-out/log-out.component';
import { AddTaskButtonComponent } from '../add-task-button/add-task-button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks-list',
  imports: [CommonModule, LogOutComponent, AddTaskButtonComponent],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css'
})
export class TasksListComponent implements OnInit {
  tasks: Task[] = [];
  error: string | null = null;
  userName: string | null = null;
  selectedTask: Task | null = null;

  deleteTask(task: Task) {
    this.taskService.deleteTaskApi(task.id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(t => t.id !== task.id);
      },
      error: () => {
        this.error = 'שגיאה במחיקת המשימה';
      }
    });
  }


  constructor(
    private taskService: TaskService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userName = localStorage.getItem('user_name');

    const userId = this.authService.getCurrentUserId?.();
    if (userId) {
      this.taskService.getTasksForUserApi().subscribe({
        next: (tasks) => {
          this.tasks = tasks;
        },
        error: (err) => {
          this.error = 'שגיאה בטעינת המשימות שלך';
        }
      });
    } else {
      // this.error = 'לא נמצא משתמש מחובר'
      this.router.navigate(['/login']);
    }
  }

  editTask(task: Task) {
    this.router.navigate(['/edit-task', task.id]);
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
        this.error = 'שגיאה בעדכון סטטוס המשימה';
      }
    });
  }
}
