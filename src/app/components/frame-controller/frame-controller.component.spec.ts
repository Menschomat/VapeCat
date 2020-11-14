import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameControllerComponent } from './frame-controller.component';

describe('FrameControllerComponent', () => {
  let component: FrameControllerComponent;
  let fixture: ComponentFixture<FrameControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrameControllerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrameControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
