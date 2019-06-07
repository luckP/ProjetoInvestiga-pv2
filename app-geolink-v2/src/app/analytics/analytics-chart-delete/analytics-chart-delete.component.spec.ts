import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsChartDeleteComponent } from './analytics-chart-delete.component';

describe('AnalyticsChartDeleteComponent', () => {
  let component: AnalyticsChartDeleteComponent;
  let fixture: ComponentFixture<AnalyticsChartDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyticsChartDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyticsChartDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
