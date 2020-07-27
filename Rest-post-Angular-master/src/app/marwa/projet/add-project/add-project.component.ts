
import { Projet } from '../projet';

import { Component, OnInit } from '@angular/core';
import { ProjetService } from '../projet.service';


import { Router } from '@angular/router';
import { FormGroup, FormControl, FormsModule, Validators } from '@angular/forms';
import { ClientService } from '../../client/client.service';
import { Client } from '../../client/client.model';





@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  name: string;
  description: string;
  status: string;
  deadline: string;
  others: string;
  client_id: number;
  client: Client[];
  constructor(private _projetService: ProjetService, private clientService: ClientService, private router: Router) { }
  /*ClientService: any;*/
  ProjectForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [Validators.required,
    ]),
    /*Validators.pattern('^[a-zA-Z0-9_.+-]+@+.[a-zA-Z0-9]+$')*/
    status: new FormControl('', [Validators.required, Validators.minLength(3)]),
    deadline: new FormControl('', [Validators.required, Validators.minLength(3)]),
    others: new FormControl('', [Validators.required, Validators.minLength(3)]),
    client_id: new FormControl('', [Validators.required, Validators.minLength(3)]),

  });
  ngOnInit(): void {
    // load list
    this.loadListClient();
  }

  get Name() {
    return this.ProjectForm.get('name');
  }
  get Description() {
    return this.ProjectForm.get('description');
  }
  get Status() {
    return this.ProjectForm.get('status');
  }
  get Deadline() {
    return this.ProjectForm.get('deadline');
  }
  get Others() {
    return this.ProjectForm.get('others');
  }
  get Client_id() {
    return this.ProjectForm.get('client_id');
  }
  // load client
  loadListClient() {
    // get all clients
    this.clientService.getAllClient().subscribe(data => {
      this.client = data;
      console.log(data);
    });

  }
  errors = [];
  clientSelectedPosition = 0;
  statusSelected :string;
  cancelAdd(event) {
    this.router.navigate(['/main/projet']);
    // naviation vers list projects
    /*this.router.navigateByUrl('http://localhost:4200/posts');*/

  }
  

  statu:String;
  onChange2(statusSelected) {
    this.statusSelected = statusSelected;
    console.log(statusSelected);
  }
  onChange(index) {
    this.clientSelectedPosition = index;
  }
 
  addProject(name, description, status, deadline, others, client_id) {
    var post = new Projet();
    post.name = name;
    post.description = description;
    post.status =this.statusSelected;
    post.deadline = deadline;
    post.others = others;
    post.client_id = this.client[this.clientSelectedPosition].id;
    
    console.table(post);
    
    this._projetService.addPost(post, this.client[this.clientSelectedPosition].id).subscribe(result => {
      console.log(result);
      this.router.navigate(['/main/projet']);
    }, error => {
      console.log(error); this.router.navigate(['/main/projet']);

    });

  }



}
