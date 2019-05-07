import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineBarChartInputsComponent } from './line-bar-chart-inputs.component';

describe('LineBarChartInputsComponent', () => {
  let component: LineBarChartInputsComponent;
  let fixture: ComponentFixture<LineBarChartInputsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineBarChartInputsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineBarChartInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
