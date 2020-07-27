import { Component, OnInit } from '@angular/core';
import { Projet } from '../projet';
import { ProjetService } from '../projet.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {

  public id: number;
  name: string;
  description: string;
  status: string;
  deadline: string;
  others: string;

  errors = [];

  constructor(private router: Router, private route: ActivatedRoute, private _postService: ProjetService) {
    this.id = this.route.snapshot.params['id'];

  }
  public project;

  ngOnInit() {
    this.loadProject();
  }
  // load list
  loadProject() {

    console.log(this.id)
    // get all projects
    this._postService.getProjectById(this.id).subscribe(data => {
      console.log(data);
      this.project = data;
      this.name = this.project.name;
      this.description = this.project.description;
      this.status = this.project.status;
      this.deadline = this.project.deadline;
      this.others = this.project.others;
    });
  }
  editProject(name, description, status, deadline, others) {
    var post = new Projet();
    post.name = name;
    post.description = description;
    post.status = status;
    post.deadline = deadline;
    post.others = others;
    console.log(post);


    /*console.table(post);*/
    this._postService.updatePost(post, this.id).subscribe(result => {
      console.log(result);
      this.router.navigate(['main/projet']);
    }, error => {
      console.log(error);
    });


  }
}
