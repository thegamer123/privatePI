import { Injectable } from '@angular/core';
import {Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import {Post} from './Post';
import {AuthService} from './auth.service';
import { User } from './User';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class UserService {

  private uri= 'http://127.0.0.1:8000/user/';

  constructor(private http: Http, private authenticationService: AuthService  ) {}

  addUser(user: User) {
    const  headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('content-type', 'application/x-www-form-urlencoded');
    headers.append( 'No-Auth', 'True');
    headers.append( 'Access-Control-Allow-Origin', '*');

    const params = new URLSearchParams();
    params.set('username', user.username);
    params.set('email', user.email);
    params.set('password', user.password);
    params.set('password_confirmation', user.password_confirmation);

    return this.http.post(this.uri +"createUser",
    params.toString(), {headers : headers}).map(res => res.json()).catch(this.handelError);
  }


  private handelError(error: Response) {
    return Observable.throw(error.json().errors || 'server error');
  }

  getUserByUserName(username): Observable<any[]> {
    const headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
    return  this.http.get(this.uri +"username/"+ username , {headers : headers}).map(res => <User[]> res.json() ).catch(this.handelError);
  }

  getAllUsers() {
    const headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
    return  this.http.get(this.uri + 'allUsers' , {headers : headers}).map(res => <User[]> res.json() ).catch(this.handelError);
  }

}
