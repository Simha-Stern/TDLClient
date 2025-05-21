import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  showPassword = false;
  error: string | null = null;
  loading = false;
  success: string | null = null;

  constructor(private auth: AuthService, private router: Router) { }

  register() {
    this.error = null;
    this.success = null;
    this.loading = true;
    this.auth.register(this.email, this.password, this.name).subscribe({
      next: (response) => {
        this.loading = false;
        if (response && response.name) {
          localStorage.setItem('user_name', response.name);
        }
        this.success = 'נרשמת בהצלחה! תיכף ניכנס...';
        setTimeout(() => this.router.navigate(['/']), 1500);
      },
      error: err => {
        this.loading = false;
        this.error = err.error?.error || 'שגיאה בהרשמה';
      }
    });
  }
  setShowpass() {
    this.showPassword ? this.showPassword = false : this.showPassword = true
  }
}
