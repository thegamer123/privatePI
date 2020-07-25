
import { CategoryProject } from './../../../models/categoryProject';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoryProjectService } from '../../../service/category-project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-project-category',
  templateUrl: './add-project-category.component.html',
  styleUrls: ['./add-project-category.component.css']
})
export class AddProjectCategoryComponent implements OnInit {
  // attributes
  categoryProject: CategoryProject;
  errors = [];

  constructor(private categoryProjectService: CategoryProjectService, private router: Router) { }

  // Form groupe add Category project
  categoryProjectForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
  }

  // getters
  get name() {
    return this.categoryProjectForm.get('name');
  }

  get description() {
    return this.categoryProjectForm.get('description');
  }

  // Add Category project function
  addCategoryProject() {
    // init object with data from form
    this.categoryProject = {
      name: this.name.value,
      description: this.description.value,
    };
    this.categoryProjectService.addCategoryProject(this.categoryProject).subscribe((result => {

      this.router.navigate(['/main/projet-category']);

    }), addError => this.errors = addError);
  };





}
