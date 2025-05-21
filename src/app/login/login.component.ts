import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class LoginComponent {
  email = '';
  password = '';
  showPassword = false;
  error: string | null = null;
  loading = false;

  constructor(private auth: AuthService, private router: Router) { }

  login() {
    this.error = null;
    this.loading = true;
    this.auth.login(this.email, this.password).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/']);
      },
      error: err => {
        this.loading = false;
        if (err.status === 401 || err.error?.status === 401) {
          this.error = 'אחד או יותר מהפרטים שהוזנו שגויים';
          return;
        }
        this.error = err.error?.error || 'שגיאה בהתחברות';
      }
    });
  }
  setShowpass() {
    this.showPassword ? this.showPassword = false : this.showPassword = true
  }
}
