import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeConfComponent } from './home-conf.component';

describe('HomeConfComponent', () => {
  let component: HomeConfComponent;
  let fixture: ComponentFixture<HomeConfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeConfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeConfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
