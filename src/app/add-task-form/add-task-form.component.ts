import { Component } from '@angular/core';
import { TaskService } from '../task.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-task-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './add-task-form.component.html',
  styleUrl: './add-task-form.component.css'
})
export class AddTaskFormComponent {
  title: string = '';
  error = '';
  success = '';


  constructor(private taskService: TaskService, private router: Router) { }

  onSubmit() {
    if (this.title.trim()) {
      this.taskService.addTaskApi(this.title.trim()).subscribe({
        next: () => {
          this.success = 'המשימה נוספה בהצלחה';
          this.error = '';
          this.title = '';
          setTimeout(() => {
            this.router.navigate(['']);
          }, 2000);
        },
        error: (err) => {
          console.error('Error adding task:', err);
          this.error = 'שגיאה בהוספת משימה';
        }
      });
    }
  }

  beck() {
    this.router.navigate(['']);
  }
}



