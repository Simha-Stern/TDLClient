import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'TDLClient';
  constructor(private router: Router) { }

  ngOnInit() {
    // מחיקת הטוקן בכניסה ראשונית
    localStorage.removeItem('token');
    this.router.navigate(['/login']);

  }

  @HostListener('window:beforeunload', ['$event'])
  clearTokenOnClose(event: Event) {
    // מחיקת הטוקן בסגירת הכרטיסייה
    localStorage.removeItem('token');
  }
}
