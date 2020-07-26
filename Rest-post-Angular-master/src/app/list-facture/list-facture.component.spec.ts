import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFactureComponent } from './list-facture.component';

describe('ListFactureComponent', () => {
  let component: ListFactureComponent;
  let fixture: ComponentFixture<ListFactureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListFactureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
