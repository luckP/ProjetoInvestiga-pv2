import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsChartAddComponent } from './analytics-chart-add.component';

describe('AnalyticsChartAddComponent', () => {
  let component: AnalyticsChartAddComponent;
  let fixture: ComponentFixture<AnalyticsChartAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyticsChartAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyticsChartAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
