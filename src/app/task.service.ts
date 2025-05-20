import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Task {
  id: number;
  userId: string;
  title: string;
  description?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [];
  private nextId = 1;

  constructor(private http: HttpClient) {}

  getTasksForUser(userId: string): Task[] {
    return this.tasks.filter(task => task.userId === userId);
  }

  getTasksForUserApi(userId: string): Observable<Task[]> {
    return this.http.get<Task[]>(`/api/tasks?userId=${userId}`);
  }

  addTask(task: Omit<Task, 'id'>): void {
    this.tasks.push({ ...task, id: this.nextId++ });
  }
}
