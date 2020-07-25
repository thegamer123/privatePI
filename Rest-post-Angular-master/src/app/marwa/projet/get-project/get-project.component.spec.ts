import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetProjectComponent } from './get-project.component';

describe('GetProjectComponent', () => {
  let component: GetProjectComponent;
  let fixture: ComponentFixture<GetProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
