import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../environments/environment';


export interface Task {
  id: number;
  userId: string;
  title: string;
  completed: boolean;
  description?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [];
  private nextId = 1;
    private apiUrl = environment.apiUrl;


  constructor(private http: HttpClient, private authService: AuthService) {}

  getTasksForUser(userId: string): Task[] {
    return this.tasks.filter(task => task.userId === userId);
  }

  getTasksForUserApi(): Observable<Task[]> {
    const token = this.authService.getToken?.();
    const headers = token
      ? new HttpHeaders({ Authorization: `Bearer ${token}` })
      : undefined;
    return this.http.get<Task[]>(this.apiUrl + 'tasks', { headers });
  }

  addTaskApi(title: string): Observable<Task> {
    const token = this.authService.getToken?.();
    const headers = token
      ? new HttpHeaders({ Authorization: `Bearer ${token}` })
      : undefined;
    return this.http.post<Task>(this.apiUrl + 'tasks', { title }, { headers });
  }

  updateTaskApi(task: Task): Observable<Task> {
    const token = this.authService.getToken?.();
    const headers = token
      ? new HttpHeaders({ Authorization: `Bearer ${token}` })
      : undefined;
    return this.http.put<Task>(`${this.apiUrl}tasks/${task.id}`, {
      title: task.title,
      completed: task.completed
    }, { headers });
  }

  deleteTaskApi(id: number): Observable<any> {
    const token = this.authService.getToken?.();
    const headers = token
      ? new HttpHeaders({ Authorization: `Bearer ${token}` })
      : undefined;
    return this.http.delete(`${this.apiUrl}tasks/${id}`, { headers });
  }
}
