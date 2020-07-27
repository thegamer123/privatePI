import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';


import { HttpHeaders, HttpClient } from '@angular/common/http';

import { Projet } from './projet';
import { AuthService } from '../../auth.service';

@Injectable()
export class ProjetService {

  private uri = 'http://localhost:8000/projet';

  private headers: HttpHeaders = new HttpHeaders({
    'Access-Control-Allow-Origin': '*', // allow all origin address
    'Access-Control-Allow-Methods': '*', // allow all methods http request (GET, POST, DELETE ...)
    'Access-Control-Allow-Headers': '*', // allow setting any header
    'Content-Type': 'application/json', // content type data as json
    'Authorization': 'Bearer ' + this.authenticationService.token// set autorization empty
  });


  constructor(private http: HttpClient, private authenticationService: AuthService) { }

  getPosts(): Observable<Projet[]> {
    return this.http.get<Projet[]>(this.uri, { headers: this.headers });

  }
  getProjectById(id: any) {
    return this.http.get(this.uri + '/get/' + id, { headers: this.headers });
  }

  addPost(post: Projet, id) {
    console.log(JSON.stringify(post));
    return this.http.post<Projet>(this.uri + '/new/' + id, post, { headers: this.headers });

  }



  updatePost(post: Projet, id) {
    return this.http.put<Projet>(this.uri + '/' + id, post, { headers: this.headers });
  }


  deletePost(id: any) {
    return this.http.delete(this.uri + '/' + id, { headers: this.headers });
  }


  private handelError(error: Response) {
    return Observable.throw(error.json().errors || 'server error');
  }


  // get all category project
  getAllProject(): Observable<Projet[]> | any {
    return this.http.get(this.uri);


  }
  deleteProject(id: any) {
    return this.http.delete(this.uri + '/' + id, { headers: this.headers });
  }
  getAllClient(): Observable<Projet[]> | any {
    return this.http.get(this.uri);


  }

}
