import { Component, OnInit } from '@angular/core';
import {ProjetService} from '../projet.service';
@Component({
  selector: 'app-delete-project',
  templateUrl: './delete-project.component.html',
  styleUrls: ['./delete-project.component.css']
})
export class DeleteProjectComponent implements OnInit {


  constructor(private _projectService: ProjetService) { }


  ngOnInit(): void {

  }


  deleteProject(id) {
    this._projectService.deleteProject(id).subscribe(() => {
      console.log('Projet deleted');
    }, err => {
      console.log(err);
    });
   /* this.notifyDelete.emit(id);*/
  }
}
