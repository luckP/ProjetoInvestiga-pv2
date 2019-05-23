import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapDeletePolygonDialogComponent } from './map-delete-polygon-dialog.component';

describe('MapDeletePolygonDialogComponent', () => {
  let component: MapDeletePolygonDialogComponent;
  let fixture: ComponentFixture<MapDeletePolygonDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapDeletePolygonDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapDeletePolygonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
