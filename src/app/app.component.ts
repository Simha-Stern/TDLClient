import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'TDLClient';

  ngOnInit() {
    // מחיקת הטוקן בכניסה ראשונית
    localStorage.removeItem('token');
  }

  @HostListener('window:beforeunload', ['$event'])
  clearTokenOnClose(event: Event) {
    // מחיקת הטוקן בסגירת הכרטיסייה
    localStorage.removeItem('token');
  }
}
