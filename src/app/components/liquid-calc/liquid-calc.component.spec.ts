import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiquidCalcComponent } from './liquid-calc.component';

describe('LiquidCalcComponent', () => {
  let component: LiquidCalcComponent;
  let fixture: ComponentFixture<LiquidCalcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiquidCalcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiquidCalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
