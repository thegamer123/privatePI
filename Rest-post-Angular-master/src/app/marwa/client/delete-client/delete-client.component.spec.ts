import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteClientComponent } from './delete-client.component';

describe('DeleteClientComponent', () => {
  let component: DeleteClientComponent;
  let fixture: ComponentFixture<DeleteClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
