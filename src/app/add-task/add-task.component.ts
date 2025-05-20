import { Component } from '@angular/core';
import { TaskService } from '../task.service';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  imports: [FormsModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent {
  title = '';
  description = '';
  error = '';

  constructor(
    private taskService: TaskService,
    private authService: AuthService
  ) {}

  addTask() {
    const userId = this.authService.getCurrentUserId();
    if (!userId) {
      this.error = 'User not logged in.';
      return;
    }
    if (!this.title.trim()) {
      this.error = 'Title is required.';
      return;
    }
    this.taskService.addTask({
      userId,
      title: this.title,
      description: this.description
    });
    this.title = '';
    this.description = '';
    this.error = '';
  }
}
