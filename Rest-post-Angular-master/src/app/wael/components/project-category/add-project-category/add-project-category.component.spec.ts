import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProjectCategoryComponent } from './add-project-category.component';

describe('AddProjectCategoryComponent', () => {
  let component: AddProjectCategoryComponent;
  let fixture: ComponentFixture<AddProjectCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProjectCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProjectCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
