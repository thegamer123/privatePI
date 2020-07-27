import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { Post } from './Post';
import { AuthService } from './auth.service';
import { FactureComponent } from './facture/facture.component';
import { Facture } from './Facture';

@Injectable()
export class FactureService {

  private uri = 'http://127.0.0.1:8000/facture/';

  private url_upload = 'http://127.0.0.1:5000/upload_pdf';

  constructor(private http: Http, private authenticationService: AuthService) { }

  getFacture(): Observable<any[]> {
    const headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
    return this.http.get(this.uri, { headers: headers }).map(res => <Facture[]>res.json()).catch(this.handelError);
  }

  addFacture(facture: Facture, clientId: number) {
    const headers = new Headers();
    headers.append('content-type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.authenticationService.token);
    return this.http.post(this.uri + 'new' + '/' + clientId,
      JSON.stringify(facture), { headers: headers }).map(res => res.json()).catch(this.handelError);
  }


  deleteFacture(id: any) {
    const headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.authenticationService.token);
    return this.http.delete(this.uri + id, { headers: headers }).map(res => res.json());
  }


  private handelError(error: Response) {

    return Observable.throw(error.json().errors || 'server error');

  }

  // upload photo
  uploadPDF(pdf: FormData): Observable<Response> | null {
    return this.http.post(this.url_upload , pdf);
  }

 /// uploadFacture(file: FormData): Observable<any[]> {
   /* const headers = new Headers();

    headers.append('Accept', 'application/json');
    headers.append("Content-type", "multipart/form-data; charset=utf-8; boundary=" + Math.random().toString().substr(2));
    return this.http.post(this.uri + 'upload',
      file, { headers: headers }).map(res => res.json())
      .map((data: { status: boolean, file_id: any }) => data.file_id)
      .catch(this.handelError);*/

  //}


}
