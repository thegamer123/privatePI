import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProjectCategoryComponent } from './update-project-category.component';

describe('UpdateProjectCategoryComponent', () => {
  let component: UpdateProjectCategoryComponent;
  let fixture: ComponentFixture<UpdateProjectCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateProjectCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProjectCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
