import { AuthService } from './../../auth.service';
import { Task } from './../models/Task';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http, Headers ,Response } from '@angular/http';

@Injectable()
export class TaskService {


  // attributes
  private url = 'http://127.0.0.1:8000/task/';

  constructor(private http: Http, private authenticationService: AuthService) { }

  // get all tasks
  getAllTask(): Observable<Task[]> {
    const headers = new Headers ({ 'Authorization': 'Bearer ' + this.authenticationService.token });
    return this.http.get(this.url, { headers: headers }).map(res => <Task[]>res.json()).catch(this.handelError);
  }

  // get Task by id
  getTaskById(id: number): Observable<Task> | null {
    const headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
    return this.http.get(this.url + id, { headers: headers }).map(res => <Task[]>res.json()).catch(this.handelError);
  }

  // add Task
  addTask(task: Task): Observable<Response> {
    const headers = new Headers();
    return this.http.post(`${this.url}new`, JSON.stringify(task));
  }


  // edit task
  updateTask(task: Task): Observable<any> {
    const headers = new Headers();
    return this.http.put(this.url + task.id + '/edit', JSON.stringify(task));
  }

  // delete task
  deleteTask(id: number) {
    const headers = new Headers({ 'Content-Type': 'application/json; charset = utf-8;' });
    headers.append('Authorization', 'Bearer ' + this.authenticationService.token);
    return this.http.delete(this.url + id + '/delete', { headers: headers });
  }

  // handel error
  private handelError(error: Response) {
    return Observable.throw(error.json().errors || 'server error');
  }
}
