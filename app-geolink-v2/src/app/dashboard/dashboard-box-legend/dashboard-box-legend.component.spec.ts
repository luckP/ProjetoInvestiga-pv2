import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardBoxLegendComponent } from './dashboard-box-legend.component';

describe('DashboardBoxLegendComponent', () => {
  let component: DashboardBoxLegendComponent;
  let fixture: ComponentFixture<DashboardBoxLegendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardBoxLegendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardBoxLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
