import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoilCalcComponent } from './coil-calc.component';

describe('CoilCalcComponent', () => {
  let component: CoilCalcComponent;
  let fixture: ComponentFixture<CoilCalcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoilCalcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoilCalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
