import { Injectable } from '@angular/core';
import {Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import {Client} from './client.model';

import {HttpHeaders, HttpClient} from '@angular/common/http';
import { AuthService } from '../../auth.service';

@Injectable()
export class ClientService {

  private uri= 'http://localhost:8000/client';

  private headers: HttpHeaders = new HttpHeaders({
    'Access-Control-Allow-Origin': '*', // allow all origin address
    'Access-Control-Allow-Methods': '*', // allow all methods http request (GET, POST, DELETE ...)
    'Access-Control-Allow-Headers': '*', // allow setting any header
    'Content-Type': 'application/json', // content type data as json
    'Authorization': 'Bearer ' + this.authenticationService.token// set autorization empty
  });


  constructor(private http: HttpClient, private authenticationService: AuthService  ) {}

  /*getPosts(): Observable<Post[]> {
    return  this.http.get<Post[]>(this.uri , {headers : this.headers});

  }
  getProjectById(id: any) {
    return this.http.get(this.uri + '/' + id, {headers : this.headers});
  }
  addPost(post: Post) {
    console.log(JSON.stringify(post));
        return this.http.post<Post>(this.uri + '/new', post, {headers : this.headers});

  }



  updatePost(post: Post , id) {
        return this.http.put<Post>(this.uri + '/' + id, post, {headers : this.headers});
  }


  deletePost(id: any) {
    return this.http.delete(this.uri + '/' + id, {headers : this.headers});
  }


  private handelError(error: Response) {
    return Observable.throw(error.json().errors || 'server error');
  }

*/
  // get all category client
getAllClient(): Observable<Client[]> | any {
    return this.http.get(this.uri);

}
addClient(client: Client) {
    console.log(JSON.stringify(client));
        return this.http.post<Client>(this.uri + '/new', client, {headers : this.headers});
 }
getClientById(id: any) {
    return this.http.get(this.uri + '/' + id, {headers : this.headers});
  }
updateClient(client: Client , id) {
    return this.http.put<Client>(this.uri + '/' + id, client, {headers : this.headers});
}
deleteClient(id: any) {
    return this.http.delete(this.uri + '/' + id, {headers : this.headers});
  }
}
