import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Component, OnInit } from '@angular/core';
import { CategoryProject } from '../../../models/categoryProject';
import { ActivatedRoute } from '@angular/router';
import { CategoryProjectService } from '../../../service/category-project.service';

@Component({
  selector: 'app-update-project-category',
  templateUrl: './update-project-category.component.html',
  styleUrls: ['./update-project-category.component.css']
})
export class UpdateProjectCategoryComponent implements OnInit {

  // attributes
  category: CategoryProject;
  idCategory: number;

  constructor(
    private activatedrouter: ActivatedRoute,
    private categoryProjectService: CategoryProjectService
  ) { }

  // Form groupe
  categoryProjectForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    description: new FormControl('', [Validators.required])
  });

  ngOnInit() {
    this.category = { name: '', description: '' };
    this.activatedrouter.paramMap.subscribe(result => {
      this.idCategory = Number(result.get('id'));
      this.categoryProjectService.getCategoryById(this.idCategory).subscribe(res => { this.category = res; });
    });
  }

  // getters
  get name() {
    return this.categoryProjectForm.get('name');
  }

  get description() {
    return this.categoryProjectForm.get('description');
  }

  updateCategoryProject() {
    this.categoryProjectService.updateCategoryProject(this.category);
  }

}
