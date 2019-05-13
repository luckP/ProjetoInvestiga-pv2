import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartLineBarComponent } from './chart-line-bar.component';

describe('ChartLineBarComponent', () => {
  let component: ChartLineBarComponent;
  let fixture: ComponentFixture<ChartLineBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartLineBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartLineBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
