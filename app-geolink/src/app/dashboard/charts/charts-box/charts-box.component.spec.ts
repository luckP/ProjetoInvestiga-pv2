import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsBoxComponent } from './charts-box.component';

describe('ChartsBoxComponent', () => {
  let component: ChartsBoxComponent;
  let fixture: ComponentFixture<ChartsBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartsBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartsBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
