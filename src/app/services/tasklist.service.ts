import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { TaskList } from '../models/todo';
import { environment } from 'src/environment/environment';
import { UserTasks } from '../models/userTask';


@Injectable({
  providedIn: 'root'
})
export class TaskListService {

  private updateTaskList = new BehaviorSubject<any>(null);
  public updateTaskList$ = this.updateTaskList.asObservable();

  private addTaskList = new BehaviorSubject<boolean>(false);
  public addTaskList$ = this.addTaskList.asObservable();

  private refreshTaskData = new BehaviorSubject<boolean>(false);
  public refreshTaskData$ = this.refreshTaskData.asObservable();


  constructor(private http: HttpClient) { }

  getAll(): Observable<UserTasks[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/todos`);
  }

  getUserTaskList(): Observable<TaskList> {
    return this.http.get<TaskList>(`${environment.apiUrl}/todos/id`);
  }

  create(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/todos`, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}/todos/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/todos/${id}`);
  }

  taskUpdate(value: TaskList) {
    this.updateTaskList.next(value);
  }

  refreshTaskListData() {
    this.refreshTaskData.next(true);
  }

  taskAdd() {
    this.addTaskList.next(true);
  }

}