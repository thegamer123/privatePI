import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetClientComponent } from './get-client.component';

describe('GetClientComponent', () => {
  let component: GetClientComponent;
  let fixture: ComponentFixture<GetClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
