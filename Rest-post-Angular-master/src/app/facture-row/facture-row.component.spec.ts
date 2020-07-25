import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactureRowComponent } from './facture-row.component';

describe('FactureRowComponent', () => {
  let component: FactureRowComponent;
  let fixture: ComponentFixture<FactureRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactureRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactureRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
