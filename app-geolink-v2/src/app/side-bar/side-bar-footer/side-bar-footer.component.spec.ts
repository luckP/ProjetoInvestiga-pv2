import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarFooterComponent } from './side-bar-footer.component';

describe('SideBarFooterComponent', () => {
  let component: SideBarFooterComponent;
  let fixture: ComponentFixture<SideBarFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideBarFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideBarFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
