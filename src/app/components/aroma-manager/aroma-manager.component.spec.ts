import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AromaManagerComponent } from './aroma-manager.component';

describe('AromaManagerComponent', () => {
  let component: AromaManagerComponent;
  let fixture: ComponentFixture<AromaManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AromaManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AromaManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
