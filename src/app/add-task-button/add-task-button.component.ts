import { Component } from '@angular/core';
import { TaskService } from '../task.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-task-button',
  imports: [FormsModule],
  templateUrl: './add-task-button.component.html',
  styleUrl: './add-task-button.component.css'
})
export class AddTaskButtonComponent {
  title: string = '';

  constructor(private router: Router) { }

  addTask() {
    this.router.navigate(['/add-task']);

  }
}
