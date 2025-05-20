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
  email = '';
  password = '';
  error: string | null = null;
  loading = false;
  success: string | null = null;

  constructor(private auth: AuthService, private router: Router) {}

  register() {
    this.error = null;
    this.success = null;
    this.loading = true;
    this.auth.register(this.email, this.password).subscribe({
      next: () => {
        this.loading = false;
        this.success = 'נרשמת בהצלחה! כעת עליך להתחבר';
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: err => {
        this.loading = false;
        this.error = err.error?.error || 'שגיאה בהרשמה';
      }
    });
  }
}
