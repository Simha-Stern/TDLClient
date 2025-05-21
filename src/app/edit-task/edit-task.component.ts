import { Component } from '@angular/core';
import { TaskService, Task } from '../task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class EditTaskComponent {
  title: string = '';
  success: string = '';
  error: string = '';
  taskId: number = 0;
  completed: boolean = false;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.taskId = +params['id'];
      // Fetch the task details (could be improved to fetch from API)
      this.taskService.getTasksForUserApi().subscribe({
        next: (tasks) => {
          const task = tasks.find(t => t.id === this.taskId);
          if (task) {
            this.title = task.title;
            this.completed = task.completed;
          } else {
            this.error = 'Task not found';
          }
        },
        error: () => {
          this.error = 'Failed to load task';
        }
      });
    });
  }

  onSubmit() {
    if (!this.title.trim()) {
      this.error = 'Title is required';
      return;
    }
    const updatedTask: Task = {
      id: this.taskId,
      userId: '', // Not needed for update
      title: this.title,
      completed: this.completed
    };
    this.taskService.updateTaskApi(updatedTask).subscribe({
      next: () => {
        this.success = 'Task updated successfully';
        setTimeout(() => this.router.navigate(['/']), 1000);
      },
      error: () => {
        this.error = 'Failed to update task';
      }
    });
  }

  beck() {
    this.router.navigate(['/']);
  }
}
