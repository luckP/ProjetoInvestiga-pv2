import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SquareControllerComponent } from './square-controller.component';

describe('SquareControllerComponent', () => {
  let component: SquareControllerComponent;
  let fixture: ComponentFixture<SquareControllerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SquareControllerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SquareControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
