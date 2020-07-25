
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Team } from '../models/team';
import { AuthService } from '../../auth.service';

@Injectable()

export class TeamService {

  // attributes
  private url = 'http://127.0.0.1:8000/team/';
  private url_upload = 'http://127.0.0.1:5000/upload';

  constructor(private http: Http, private authenticationService: AuthService ) { }

  // get all Team
  getAllTeam(): Observable<Team[]> {
    const headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
    return  this.http.get(this.url , {headers : headers}).map(res => <Team[]> res.json() ).catch(this.handelError);
  }

  // get Team by id
  getTeamById(id: number): Observable<Team> | null {
    const headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
    return  this.http.get(this.url + id , {headers : headers}).map(res => <Team> res.json() ).catch(this.handelError);
  }

  // add Team
  addTeam(team: Team) {
    const headers = new Headers({ 'Content-Type': 'application/json; charset = utf-8;'});
    return this.http.post(this.url + 'new', JSON.stringify(team)).subscribe(data => {
        console.log('team added');
      }, error => {
        console.log(error);
    });
  }

  // edit Team
  updateTeam(team: Team) {
    const headers = new Headers({ 'Content-Type': 'application/json; charset = utf-8;'});
    return this.http.put(this.url + team.id + '/edit', JSON.stringify(team)).subscribe(data => {
      console.log('team updated');
      }, error => {
      console.log(error);
    });
  }

  // delete Team
  deleteTeam(id: number) {
    const headers = new Headers({ 'Content-Type': 'application/json; charset = utf-8;'});
    headers.append('Authorization', 'Bearer ' + this.authenticationService.token);
    console.log(this.url + id + '/delete');
    return this.http.delete(this.url + id + '/delete' , {headers : headers});
  }

  // upload photo
  uploadPhoto(photo: FormData): Observable<Response> | null {
    return this.http.post(this.url_upload , photo);
  }


  // handel error
  private handelError(error: Response) {
    return Observable.throw(error.json().errors || 'server error');
  }
}
