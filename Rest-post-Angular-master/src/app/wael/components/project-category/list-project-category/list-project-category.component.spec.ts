import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProjectCategoryComponent } from './list-project-category.component';

describe('ListProjectCategoryComponent', () => {
  let component: ListProjectCategoryComponent;
  let fixture: ComponentFixture<ListProjectCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListProjectCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProjectCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
