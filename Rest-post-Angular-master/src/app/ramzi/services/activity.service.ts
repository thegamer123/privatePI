import { Observable } from 'rxjs/Observable';
import { Activity } from './../models/Activity';
import { Http, Headers ,Response } from '@angular/http';
import { AuthService } from './../../auth.service';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
@Injectable()
export class ActivityService {

  // attributes
  private url = 'http://127.0.0.1:8000/activity/';

  constructor(private http: Http, private authenticationService: AuthService) { }

  // get all activity
  getAllActivity(): Observable<Activity[]> {
    const headers = new Headers ({ 'Authorization': 'Bearer ' + this.authenticationService.token });
    return this.http.get(this.url, { headers: headers }).map(res => <Activity[]>res.json()).catch(this.handelError);
  }

  // get Activity by id
  getCategoryById(id: number): Observable<Activity> | null {
    const headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
    return this.http.get(this.url + id, { headers: headers }).map(res => <Activity[]>res.json()).catch(this.handelError);
  }

  // add activity
  addActivity(activity: Activity): Observable<Response> {
    const headers = new Headers();
    return this.http.post(`${this.url}new`, JSON.stringify(activity));
  }


  // edit category  project
  updateActivity(activity: Activity): Observable<any> {
    const headers = new Headers();
    return this.http.put(this.url + activity.id + '/edit', JSON.stringify(activity));
  }

  // delete category project
  deleteActivity(id: number) {
    const headers = new Headers({ 'Content-Type': 'application/json; charset = utf-8;' });
    headers.append('Authorization', 'Bearer ' + this.authenticationService.token);
    return this.http.delete(this.url + id + '/delete', { headers: headers });
  }

  // handel error
  private handelError(error: Response) {
    return Observable.throw(error.json().errors || 'server error');
  }
}
