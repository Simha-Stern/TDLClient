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
  titles: string[] = [''];
  error = '';
  success = '';

  constructor(private taskService: TaskService, private router: Router) { }

  addTaskField() {
    this.titles.push('');
  }

  onSubmit() {
    const tasksToAdd = this.titles.map(t => t.trim()).filter(t => t);
    if (tasksToAdd.length > 0) {
      let addedCount = 0;
      let hasError = false;
      tasksToAdd.forEach((task, idx) => {
        this.taskService.addTaskApi(task).subscribe({
          next: () => {
            addedCount++;
            if (addedCount === tasksToAdd.length && !hasError) {
              this.success = 'המשימות נוספו בהצלחה';
              this.error = '';
              this.titles = [''];
              setTimeout(() => {
                this.router.navigate(['']);
              }, 2000);
            }
          },
          error: (err) => {
            console.error('Error adding task:', err);
            this.error = 'שגיאה בהוספת משימות';
            hasError = true;
              setTimeout(() => {
                this.router.navigate(['']);
              }, 2000);
          }
        });
      });
    }
  }

  beck() {
    this.router.navigate(['']);
  }

  get titlesIndices(): number {
    return this.titles ? this.titles.length : 1;
  }
}
