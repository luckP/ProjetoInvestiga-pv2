import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsAddComponent } from './analytics-add.component';

describe('AnalyticsAddComponent', () => {
  let component: AnalyticsAddComponent;
  let fixture: ComponentFixture<AnalyticsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyticsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyticsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
