import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAromaComponent } from './new-aroma.component';

describe('NewAromaComponent', () => {
  let component: NewAromaComponent;
  let fixture: ComponentFixture<NewAromaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewAromaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAromaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
