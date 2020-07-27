import { Component, OnInit, Input } from '@angular/core';
import { ProjetService } from '../projet.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-project',
  templateUrl: './get-project.component.html',
  styleUrls: ['./get-project.component.css']
})
export class GetProjectComponent implements OnInit {

  @Input() i: any;


  public listProject = [];

  constructor(private _postService: ProjetService, private router: Router) { }

  ngOnInit(): void {
    // load list
    this.loadListProject();
  }

  // load list
  loadListProject() {
    // get all projects
    this._postService.getAllProject().subscribe(data => {
      this.listProject = data;
    });
  }


  navigateToDetails(index) {
    // naviation vers edit-projet/id
    this.router.navigate(['main/projet/', this.listProject[index].id]);
  }

  deleteProject(index) {
    this._postService.deleteProject(this.listProject[index].id).subscribe(() => {
      console.log('Projet deleted');
      this.listProject.splice(index, 1);
    }, (err) => console.log(err));
    /* this.notifyDelete.emit(id);*/
  }
}
