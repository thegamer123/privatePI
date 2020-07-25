import { CategoryProject } from './../models/categoryProject';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { AuthService } from '../../auth.service';


@Injectable()

export class CategoryProjectService {


  // attributes
  private url = 'http://127.0.0.1:8000/category_project/';

  constructor(private http: Http, private authenticationService: AuthService) { }

  // get all category projects
  getAllCategory(): Observable<CategoryProject[]> {
    const headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
    return this.http.get(this.url, { headers: headers }).map(res => <CategoryProject[]>res.json()).catch(this.handelError);
  }

  // get Category by id
  getCategoryById(id: number): Observable<CategoryProject> | null {
    const headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
    return this.http.get(this.url + id, { headers: headers }).map(res => <CategoryProject[]>res.json()).catch(this.handelError);
  }



  // add Project Category
  addCategoryProject(category: CategoryProject): Observable<Response> {
    const headers = new Headers();
    return this.http.post(this.url + 'new', JSON.stringify(category));
  }



  // edit category  project
  updateCategoryProject(category: CategoryProject) {
    const headers = new Headers();
    return this.http.put(this.url + category.id + '/edit', JSON.stringify(category)).subscribe(data => {
      console.log('category updated');
    }, error => {
      console.log(error);
    });
  }

  // delete category project
  deleteCategoryProject(id: number) {
    const headers = new Headers({ 'Content-Type': 'application/json; charset = utf-8;' });
    headers.append('Authorization', 'Bearer ' + this.authenticationService.token);
    console.log(this.url + id + '/delete');
    return this.http.delete(this.url + id + '/delete', { headers: headers });
  }

  // handel error
  private handelError(error: Response) {
    return Observable.throw(error.json().errors || 'server error');
  }
}
