import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsControllerComponent } from './analytics-controller.component';

describe('AnalyticsControllerComponent', () => {
  let component: AnalyticsControllerComponent;
  let fixture: ComponentFixture<AnalyticsControllerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyticsControllerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyticsControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
