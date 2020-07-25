import { Injectable } from '@angular/core';
import {Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import {Post} from './Post';
import {AuthService} from './auth.service';

@Injectable()
export class FactureService {

  private uri= 'http://127.0.0.1:8000/facture/';



  constructor(private http: Http, private authenticationService: AuthService  ) {}

  getFacture(): Observable<any[]> {
    const headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
    return  this.http.get(this.uri , {headers : headers}).map(res => <Post[]> res.json() ).catch(this.handelError);
  }

  addPost(post: Post) {
    const  headers = new Headers();
    headers.append('content-type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.authenticationService.token);
    return this.http.post(this.uri, JSON.stringify(post), {headers : headers}).map(res => res.json()).catch(this.handelError);
  }


  deletePost(id: any) {
    const  headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.authenticationService.token);
    return this.http.delete(this.uri + '/' + id, {headers : headers}).map(res => res.json());
  }


  private handelError(error: Response) {

    return Observable.throw(error.json().errors || 'server error');

  }

}
