
import { CategoryProject } from './../../../models/categoryProject';
import { Component, OnInit } from '@angular/core';
import { CategoryProjectService } from '../../../service/category-project.service';

@Component({
  selector: 'app-list-project-category',
  templateUrl: './list-project-category.component.html',
  styleUrls: ['./list-project-category.component.css']
})
export class ListProjectCategoryComponent implements OnInit {

  // attributes
  listCategoryProject: CategoryProject [];


  constructor(private categoryProjectService: CategoryProjectService) { }

  ngOnInit() {
    this.loadPage();
  }


  // load page
  loadPage() {
    this.loadListCategory();
  }

  // load list
  loadListCategory() {
    // get all category projects
    this.categoryProjectService.getAllCategory().subscribe(data => {
      console.log(data);
      this.listCategoryProject = data;
  });
}

  // delete category
  deleteCategory(id: any) {
    console.log(id);
    this.categoryProjectService.deleteCategoryProject(id).subscribe(x => {
      console.log(x);
      this.loadPage();
    });
  }

  // edit category
  editCategory() {
    console.log('open edit component');
  }

}
